const questions = [
    {
        question : "Apa kepanjangan dari HTML?PEMBEDA HAPUS AJA",
        optionA : "Hyper Text Markup Language",
        optionB : "Hyper Text Multiple Language",
        optionC : "Hyper Tool Multi Language",
        optionD : "Hyper Text Markup Leveler",
        correctOption : "optionA"
    },
    {
        question : "CSS digunakan untuk apa dalam pengembangan web?",
        optionA : "Menambahkan interaktivitas ke halaman web",
        optionB : "Mengatur tata letak dan tampilan halaman web",
        optionC : "Memproses data dan interaksi pengguna di sisi klien",
        optionD : "Membangun server dan mengelola database",
        correctOption : "optionB"
    },
    {
        question : "JavaScript adalah bahasa pemrograman yang digunakan untuk apa?",
        optionA : "Mengatur tata letak dan desain halaman web",
        optionB : "Membangun server dan mengelola database",
        optionC : "Membuat animasi dan efek visual di halaman web",
        optionD : "Membuat tampilan halaman web yang interaktif",
        correctOption : "optionD"
    },
    {
        question : "Python adalah bahasa pemrograman yang sering digunakan untuk apa?",
        optionA : "Membuat slide presentasi",
        optionB : "Membuat aplikasi mobile",
        optionC : "Analisis data dan kecerdasan buatan",
        optionD : "Pengembangan web",
        correctOption : "optionC"
    },
    {
        question : "PHP adalah bahasa pemrograman yang sering digunakan untuk apa?",
        optionA : "Mengatur tata letak dan tampilan halaman web",
        optionB : "Membuat tampilan halaman web yang interaktif",
        optionC : "Memproses data dan interaksi pengguna di sisi server",
        optionD : "Membuat aplikasi mobile",
        correctOption : "optionC"
    },
    {
        question : "Apa yang digunakan untuk memilih elemen HTML berdasarkan kelas CSS?",
        optionA : "#",
        optionB : ".",
        optionC : "*",
        optionD : "@",
        correctOption : "optionB"
    },
    {
        question : "Di antara berikut ini, manakah yang bukan tipe data di JavaScript?",
        optionA : "Integer",
        optionB : "String",
        optionC : "Float",
        optionD : "Array",
        correctOption : "optionD"
    },
    {
        question : "Fungsi print() dalam Python digunakan untuk apa?",
        optionA : "Membuat loop atau pengulangan",
        optionB : "Mengambil input dari pengguna",
        optionC : "Memproses string",
        optionD : "Menampilkan output ke konsol",
        correctOption : "optionD"
    },
    {
        question : "Apa yang digunakan untuk menghubungkan file CSS eksternal dengan halaman HTML?",
        optionA : "<link>",
        optionB : "<style>",
        optionC : "<scrypt>",
        optionD : "<head>",
        correctOption : "optionA"
    },
    {
        question : "Apa yang digunakan untuk membuat komentar satu baris dalam CSS?",
        optionA : "//",
        optionB : "#",
        optionC : "/* /",
        optionD : "%",
        correctOption : "optionC"
    }
] 

let shuffledQuestions = [] // untuk menyimpan pertanyaan yang sudah diacak

function handleQuestions() {
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById("option-modal").style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null  

    if (playerScore <= 3) {
        remark = "Buruk, coba lagi!"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Lumayan, coba lagi!"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Bagus, pertahankan!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById("remarks").innerHTML = remark
    document.getElementById("remarks").style.color = remarkColor
    document.getElementById("grade-percentage").innerHTML = playerGrade
    document.getElementById("wrong-answers").innerHTML = wrongAttempt
    document.getElementById("right-answers").innerHTML = playerScore
    document.getElementById("score-modal").style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById("score-modal").style.display = "none"
}

function closeOptionModal() {
    document.getElementById("option-modal").style.display = "none"
}