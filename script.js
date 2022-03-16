
window.addEventListener("load",function(){
    
    //Selectors
    let dropDown=document.getElementById("question").querySelector("select");
    let studentName=document.getElementById("student_name");
    let startButton=document.getElementById("Start");
    let question_body=document.querySelector("#question h2");
    let choices=document.getElementById("choices");
    let navigators=document.getElementById("navigators");
    let timeLeft=document.getElementById("time_left");
    let submit=document.getElementById("submit");
    let final=document.querySelector("#question");

    //variables
    let minutes=1;
    let seconds=60;
    let result=[0,0,0,0,0];
    let finalResult=0;
    let chosen=["","","","",""];
    let navigator=0;
    let question_arr=[  
                        ["The HTML document contains a root tag called …","HTML","HEAD","Title","Body","HTML"],
                        ["A page designed in HTML is called …","Application","Web page","Front-end","Cover page","Web page"],
                        ["An HTML document can contain …","Attributes","Tags","Raw text","All the answers are true","All the answers are true"],
                        ["Which of the following keywords is used to define a variable in Javascript?","let","var","Both A and B","None of the above","Both A and B"],
                        ["Which of the following methods can be used to display data in some form using Javascript?","Document.write()","Console.log()","Window.alert()","All of the above","All of the above"],
                        ["What keyword is used to check whether a given property is valid or not?","Is in ","In","Exists","lies","In"],
                        ["CSS stands for …","Cascade style sheets","Color and style sheets","Cascading style sheets","None of the above","Cascading style sheets"],
                        ["The property in CSS used to change the background color of an element is…","background-color","color","bcolor","All of the above","background-color"],
                        ["Which of the following is the correct syntax to make the background-color of all paragraph elements to yellow?","all {background-color : yellow;}","p {background-color : yellow;}","p {background-color : #yellow;}","all p {background-color : #yellow;}","p {background-color : yellow;}"],
                        ["When interpreter encounters empty statements, what it will do?","Shows a warning","Ignores the statements","Throws an error","Prompts to complete the statement","Ignores the statements"]
                    ];
    

    //start button click event handling
    startButton.onclick=function(){

        //condition to make sure that the student chose a name before entering the exam
        if(dropDown.value=='  '){ 
            alert("Please choose your name from the dropdown list first");
        } 
        else{
            
            const examProcess=function(){
                
                //1 show the student name in the header
                studentName.innerHTML=dropDown.value;
                
                //2 Exam timer
                let timerId=setInterval(function(){

                    seconds--;
                    if(seconds<10){
                        timeLeft.innerText=`0${minutes}:0${seconds}`;
                    }
                    else{
                        timeLeft.innerText=`0${minutes}:${seconds}`;
                    }
                    
                    if(seconds==0){

                        if((minutes==0)&&(seconds==0)){  //exam time is out, the exam must be closed and the result is shown
                            timeLeft.innerText=`00:00`;  
                            clearInterval(timerId);
                            endExam();
                        }
                        else{
                            seconds=60;
                            minutes--;
                            timeLeft.innerText=`0${minutes}:${seconds}`;
                        }
                    } 
            
                },1000);//end of setInterval

                //3 generate random questions array for this exam
                let random;
                let current_exam_q_index=new Array();

                while(current_exam_q_index.length<5){
                    random=Math.floor(Math.random()*10);
                    if(current_exam_q_index.indexOf(random)==-1){current_exam_q_index.push(random);}
                }

                //4 remove start button and selection list to start the exam
                startButton.remove();
                dropDown.remove();

                //5 function to show questions and choices and get the answer of every question

                const q_fun=function(){
                
                    //5.1 question
                    question_body.innerText=question_arr[current_exam_q_index[navigator]][0];
                    
                    //5.2 choices
                    choices.innerHTML=`<input id="a" style="width:20px; height: 20px;" name="question_choice" type="radio"><label for="a">${question_arr[current_exam_q_index[navigator]][1]}</label><br>
                    <input id="b" style="width:20px; height: 20px;" name="question_choice" type="radio"><label for="b">${question_arr[current_exam_q_index[navigator]][2]}</label><br>
                    <input id="c" style="width:20px; height: 20px;" name="question_choice" type="radio"><label for="c">${question_arr[current_exam_q_index[navigator]][3]}</label><br>
                    <input id="d" style="width:20px; height: 20px;" name="question_choice" type="radio"><label for="d">${question_arr[current_exam_q_index[navigator]][4]}</label><br>`;
                    
                    //5.3 putting style on label tags
                    let choices_arr=choices.querySelectorAll("label");
                    for(let i=0; i<choices_arr.length; i++){
                        choices_arr[i].classList.add("choice_style");
                    }
                    
                    //5.4 getting radio inputs to check for the chosen answer
                    let radio_arr=choices.querySelectorAll("input[name=question_choice]");

                    //put the saved chosen answer if any
                    if(chosen[navigator]!=''){
                        for(let i=0; i<choices_arr.length;i++){
                            if(chosen[navigator]==choices_arr[i].innerText){
                                radio_arr[i].checked=true;
                            }
                        }
                    }
                    
                    //5.5 get the result of each question as an element in the result array
                    for(let i=0; i<radio_arr.length; i++){
                        radio_arr[i].onchange=function(){
                            if(radio_arr[i].checked==true){
                                chosen[navigator]=choices_arr[i].innerText;
                                if(choices_arr[i].innerText==question_arr[current_exam_q_index[navigator]][5]){
                                    result[navigator]=1;
                                }
                                else{
                                    result[navigator]=0;
                                }
                            }
                        }//end of on change event
                    }//end of for loop on the radio inputs
                    
                } //end of q-fun
            
                q_fun();
                
                //6 create next and previous buttons for navigation and their binded click events
                let next_q=document.createElement("button");
                let previous_q=document.createElement("button");
                next_q.classList.add("navigator_button");
                previous_q.classList.add("navigator_button");
                next_q.innerText="Next Question";
                previous_q.innerText="Previous Question";
                navigators.appendChild(previous_q);
                navigators.appendChild(next_q);

                //6.1 on click event on next button
                next_q.onclick=function(){
                
                    navigator++;
                    if(navigator==5){
                        navigator=4; //to prevent throwing error
                    }
                    q_fun();

                }//end of click event on next button

                //6.2 on click event on previous button
                previous_q.onclick=function(){
                    
                    navigator--;
                    if(navigator==-1){
                        navigator=0; //to prevent throwing error
                    }
                    q_fun();
                    
                }//end of click event on previous button

                //end of exam ,removing questions and choices and getting the final result
                const endExam=function(){
                
                    //get the final result and store it with the student name in the local storage
                    for(i of result){
                        finalResult+=i;
                    }
                    
                    finalResult=(finalResult/5)*100; //as a percentage
                    localStorage.setItem(`${dropDown.value}`,`${finalResult}`);
                    
                    //remove questions
                    question_body.remove();
                    choices.remove();
                    navigators.remove();
                    
                    //show the result
                    if(finalResult>=60){
                        final.classList.add("success");
                        final.innerHTML=`<p>Congratulations ${dropDown.value}.</p>`;
                    }
                    else{
                        final.classList.add("failure");
                        final.innerHTML=`<p>Sorry ${dropDown.value}.</p>`;
                    }

                    final.innerHTML+=`<p>Your Result is ${finalResult}%</p>`;
                    
                }//end of endExam function
            
                //on click event on submit image
                submit.onclick=function(){

                    timeLeft.innerText=`00:00`;
                    clearInterval(timerId);
                    endExam();

                }

            }//end of examProcess function

            //1- (first step whent clicking the start button) getting the previous result of the student if he took the exam before
            let previousRelsult=localStorage.getItem(`${dropDown.value}`);

            if(previousRelsult===null){
                examProcess();
            }
            else{ //get the confirmation from the student first that he really wants to take the exam again
                
                if(confirm(`Your previous result is ${previousRelsult}% it will be replaced with the new result if you take the exam again, Do you want to continue?`)==true){
                    examProcess();
                }
            }

        } // end of condition of checking that a name is selected to give access to enter the exam

    } //end of start button click event

})//end of window load event


