//Defining global variables

var questionsArray = [
    //question1
    {
        questionText: 'Who is the "Boy that Lived"?',
        questionChoices: ['Ron Weasley', 'Harry Potter', 'Neville Longbottom', 'Albus Dumbledore'],
        questionCorrectChoice: 1,
        correctDetails: 'Harry Potter'
    },
    //question2
    {
        questionText: 'Who is the "greatest headmaster" Hogwarts ever had?',
        questionChoices: ['Severus Snape', 'Dolores Umbridge', 'Albus Dumbledore', 'Tom Riddle'],
        questionCorrectChoice: 2,
        correctDetails: 'Albus Dumbledore'
    },
    //question3
    {
        questionText: 'Who is "He Who Shall Not Be Named"?',
        questionChoices: ['Harry Potter', 'Ron Weasley', 'Lord Voldemort', 'Severus Snape'],
        questionCorrectChoice: 2,
        correctDetails: 'Lord Voldemort'
    },
    //question4
    {
        questionText: 'What is the name of the platform the Hogwart Express leaves from?',
        questionChoices: ['9 1/2', '9 2/5', '9 3/4', '9'],
        questionCorrectChoice: 2,
        correctDetails: '9 3/4'
    },
    //question5
    {
        questionText: 'Which house is Hermonie Granger in?',
        questionChoices: ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw'],
        questionCorrectChoice: 0,
        correctDetails: 'Gryffindor'
    },
    //question6
    {
        questionText: 'Which house is Neville Longbottom in?',
        questionChoices: ['Slytherin', 'Gryffindor', 'Hogwarts', 'Ravenclaw'],
        questionCorrectChoice: 0,
        correctDetails: 'Gryffindor'
    },
    //question7
    {
        questionText: 'What is the name of the bookstore where students buy their books?',
        questionChoices: ["Botty's Berts", 'Shrieking Shack', 'Florish and Blotts', "Wormtail's and Padfoot's"],
        questionCorrectChoice: 2,
        correctDetails: 'Florish and Blotts'
    },
    //question8
    {
        questionText: 'Who wrote "A History of Magic"?',
        questionChoices: ['Sirius Black', 'Severus Snape', 'Albus Dumbledore', 'Bathilda Bagshot'],
        questionCorrectChoice: 3,
        correctDetails: 'Bathilda Bagshot'
    },
    //question9
    {
        questionText: 'What does O.W.L stand for?',
        questionChoices: ['Outstanding Wizarding Letters', 'Outstanding Wizarding Levels', 'Ordinary Wizarding Levels', 'Ordinary World Levels'],
        questionCorrectChoice: 2,
        correctDetails: 'Ordinary Wizarding Levels'
    },
    //question10
    {
        questionText: "What is the Gryffindor's house ghost's name?",
        questionChoices: ['Nearly Headless Nick', 'Bloody Baron', 'Moaning Myrtle', 'The Fat Friar'],
        questionCorrectChoice: 0,
        correctDetails: 'Nearly Headless Nick'
    }
];

var currentQuestionNumber = 0;
var totalNumberOfQuestions = questionsArray.length;
var totalNumberOfCorrectAnswers = 0;





//Defining functions

function displayQuestion() {
    console.log(currentQuestionNumber);
    // display updated question text.
    $('.question').text(questionsArray[currentQuestionNumber].questionText);

    // first delete all the existing choices before populating it with new ones
    $('.answers-wrapper').empty();

    // display question number out of total number of questions
    var totalNumberOfChoices = questionsArray[currentQuestionNumber].questionChoices.length;
    var buildEachChoiceHTML = "";
    //loop thorugh the answer choices.

    for (var i = 0; i < totalNumberOfChoices; i++) {
        buildEachChoiceHTML += '<div class="column column-radio">';
        buildEachChoiceHTML += '<input type="radio" class="option" tabindex=' + (i + 1) + ' id=' + i + ' name="option" value=' + i + '>';
        buildEachChoiceHTML += '</div>';
        buildEachChoiceHTML += '<div class="column">';
        buildEachChoiceHTML += '<label for=' + i + '>' + questionsArray[currentQuestionNumber].questionChoices[i] + '</label>';
        buildEachChoiceHTML += '</div>';
    }

    //    for (var i = 0; i < totalNumberOfChoices; i++) {
    //        var buildEachChoiceHTML = "<input type='radio' class='option' id=" + i + " name='option' value=" + i + "> <label for=" + i + ">" + questionsArray[currentQuestionNumber].questionChoices[i] + "</label><br>";
    //        $('#form').append(buildEachChoiceHTML);
    //
    //    }

    $('#choices').html(buildEachChoiceHTML);
    //display the number of the current question
    $('#questionNumberDisplay').text("Question " + (currentQuestionNumber + 1) + " of " + totalNumberOfQuestions);
    //display the correct total number of correct answers
    $("#questionScore").text("Correct Answer: " + totalNumberOfCorrectAnswers + " out of " + totalNumberOfQuestions);

}


//Using functions

$(document).ready(function () {

    //on page load hide the questions container and results section keeping the intro section only
    $('.quiz').hide();
    $('.results-section').hide();

    // start button trigger (onClick) in order to hide the intro container and display the question container
    $('.start-button').click(function () {
        $('.results-section').hide();
        $('.intro').hide();
        $('.quiz').show();
        $('#choices').empty();
        displayQuestion();
    });


    //show quiz questions


    $('#answers-wrapper').on('submit', function (event) {
        event.preventDefault();
        var userAnswer = $('input[class="option"]:checked').val();
        var correctAnswer = questionsArray[currentQuestionNumber].questionCorrectChoice;
        if (userAnswer == correctAnswer) {
            //if the answer was correct increment the total number of correct totalNumberofCorrectAnswers
            totalNumberOfCorrectAnswers++;
        }
        if (!userAnswer) {
            alert("Please select your answer!");
            return;
        } else {
            alert("Correct answer: " + questionsArray[currentQuestionNumber].correctDetails);
            //$(".correctAnswers").text("Previous correct answer: " + //questionsArray[currentQuestionNumber].correctDetails).show;


            $('#quiz-answers').append("<h4 class='results-question'>Q: " + questionsArray[currentQuestionNumber].questionText + "</h4>");
            $('#quiz-answers').append("<h5 class='results-answer'>A: " + questionsArray[currentQuestionNumber].correctDetails + "</h5>");
            $()

            // if the question on the screen the last question display the results container (the total score and all the answers details)
            //        console.log(totalNumberofCorrectAnswers);
            if ((currentQuestionNumber + 1) == totalNumberOfQuestions) {
                $('#final-score').text(totalNumberOfCorrectAnswers + "/" + totalNumberOfQuestions);

                $('.quiz').hide();
                $('.start').hide();
                $('.results-section').show();
            } else {
                currentQuestionNumber++;
                displayQuestion();
            }
        }
    });

    // click on the try again button will start a new cycle
    $('.results-section').on('click', '.try-again', function () {
        $('.intro').show();
        $('.quiz').hide();
        $('.results-section').hide();
        currentQuestionNumber = 0;
        totalNumberofCorrectAnswers = 0;
        location.reload();
    });
});
