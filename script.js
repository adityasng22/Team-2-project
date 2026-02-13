document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navigation & Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Simple hamburger animation toggle could go here
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Content Data (Simulation of "AI" or Database) ---
    const topicData = {
        budgeting: {
            title: "Budgeting 101: The 50/30/20 Rule",
            content: `
                <p>Budgeting isn't about restricting yourself; it's about telling your money where to go.</p>
                <div style="background:#EFF6FF; padding:1rem; border-radius:8px; margin:1rem 0;">
                    <strong>The 50/30/20 Rule</strong> is a simple way to budget:
                    <ul style="margin-left:1.5rem; margin-top:0.5rem;">
                        <li><strong>50% Needs:</strong> Rent, groceries, bills.</li>
                        <li><strong>30% Wants:</strong> Dining out, hobbies, Netflix.</li>
                        <li><strong>20% Savings:</strong> Emergency fund, investments.</li>
                    </ul>
                </div>
                <p><strong>Start Small:</strong> Track your expenses for just one week to see where your money goes.</p>
            `
        },
        banking: {
            title: "Banking Basics",
            content: `
                <p>A bank account is the foundation of financial security.</p>
                <h4>Safety Tips:</h4>
                <ul style="margin-left:1.5rem; margin-bottom:1rem;">
                    <li>Keep your PIN secret. Never write it on the card.</li>
                    <li><strong>UPI Safety:</strong> You only need to scan a QR code to PAY money, never to RECEIVE money.</li>
                </ul>
                <p><strong>Types of Accounts:</strong></p>
                <p><em>Savings Account:</em> Earns interest, money is safe & accessible.<br>
                <em>Fixed Deposit (FD):</em> Higher interest, money locked for a period.</p>
            `
        },
        loans: {
            title: "Loans & Debt: The Good, The Bad",
            content: `
                <p>Not all debt is bad. It depends on why you borrow.</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1rem 0;">
                    <div style="background:#ECFDF5; padding:0.5rem; border-radius:4px;">
                        <strong>Good Debt ✅</strong><br>Education Loan, Home Loan (Builds value)
                    </div>
                    <div style="background:#FEF2F2; padding:0.5rem; border-radius:4px;">
                        <strong>Bad Debt ❌</strong><br>Credit Card debt for shopping, Personal loans for vacations
                    </div>
                </div>
                <p><strong>Warning:</strong> Always check the interest rate and ensure the EMI is affordable (less than 40% of income).</p>
            `
        },
        insurance: {
            title: "Insurance & Emergency Funds",
            content: `
                <p>Life is unpredictable. Be prepared.</p>
                <h4>The Emergency Fund</h4>
                <p>Aim to save 3-6 months of household expenses in a separate account. Touch this ONLY for emergencies (medical, job loss).</p>
                <h4>Insurance Types</h4>
                <p><strong>Health Insurance:</strong> Prevents medical bills from wiping out your savings.<br>
                <strong>Life Insurance (Term Plan):</strong> Protects your family financially if something happens to the earner.</p>
            `
        }
    };

    // --- Modal Logic ---
    const modal = document.getElementById('topic-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const topicCards = document.querySelectorAll('.topic-card');

    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.getAttribute('data-topic');
            if (topicData[topic]) {
                modalBody.innerHTML = `<h2>${topicData[topic].title}</h2>${topicData[topic].content}`;
                modal.style.display = 'block';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- Quiz Logic ---
    const quizData = [
        {
            question: "You get ₹500 as a birthday gift. What is the smartest move?",
            options: [
                "Spend it all on a video game",
                "Save ₹200, Spend ₹300",
                "Lend it to a friend who never pays back"
            ],
            correct: 1,
            feedback: "Correct! Saving a portion (the 20% rule) builds a habit, while still allowing you to enjoy your gift."
        },
        {
            question: "Someone calls asking for your UPI PIN to 'receive' a prize. You should:",
            options: [
                "Give them the PIN quickly",
                "Disconnect the call immediately",
                "Ask them to wait while you find it"
            ],
            correct: 1,
            feedback: "Correct! You never need a PIN to receive money. This is a common scam."
        },
        {
            question: "Which of these is a 'Need'?",
            options: [
                "The latest iPhone",
                "Dining at a restaurant",
                "Groceries for the week"
            ],
            correct: 2,
            feedback: "Correct! Needs are essentials for survival. The others are Wants."
        }
    ];

    let currentQuestion = 0;
    const quizContainer = document.querySelector('.quiz-container');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');

    function loadQuiz() {
        // Initial state
        if (currentQuestion === -1) {
            // Start button logic if we wanted a start screen, but we'll just start
            currentQuestion = 0;
        }

        if (currentQuestion >= quizData.length) {
            questionEl.innerHTML = "<h3>Quiz Completed! 🎉</h3><p>You are on your way to becoming financially smart!</p>";
            optionsEl.innerHTML = '<button onclick="location.reload()" class="btn btn-outline">Restart Quiz</button>';
            feedbackEl.classList.add('hidden');
            nextBtn.classList.add('hidden');
            return;
        }

        const data = quizData[currentQuestion];
        questionEl.innerHTML = `<p>${currentQuestion + 1}. ${data.question}</p>`;
        optionsEl.innerHTML = '';
        
        data.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('quiz-option');
            btn.textContent = opt;
            btn.addEventListener('click', () => checkAnswer(index, btn));
            optionsEl.appendChild(btn);
        });

        feedbackEl.classList.add('hidden');
        feedbackEl.textContent = '';
        nextBtn.classList.add('hidden');
    }

    function checkAnswer(selectedIndex, btn) {
        // Disable all buttons
        const allBtns = optionsEl.querySelectorAll('.quiz-option');
        allBtns.forEach(b => b.style.pointerEvents = 'none');

        const data = quizData[currentQuestion];
        if (selectedIndex === data.correct) {
            btn.classList.add('correct');
            feedbackEl.classList.remove('hidden');
            feedbackEl.style.color = 'var(--secondary)';
            feedbackEl.innerText = "✅ " + data.feedback;
        } else {
            btn.classList.add('incorrect');
            // Highlight correct one
            allBtns[data.correct].classList.add('correct');
            feedbackEl.classList.remove('hidden');
            feedbackEl.style.color = 'var(--danger)';
            feedbackEl.innerText = "❌ Oops! " + data.feedback;
        }
        
        nextBtn.classList.remove('hidden');
    }

    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        loadQuiz();
    });

    // Start Quiz
    loadQuiz();

    // --- Calculator Logic ---
    
    // Savings Calculator
    const calcSavingsBtn = document.getElementById('calc-savings-btn');
    const savingsResult = document.getElementById('savings-result');

    calcSavingsBtn.addEventListener('click', () => {
        const goal = parseFloat(document.getElementById('goal-amount').value);
        const months = parseFloat(document.getElementById('goal-months').value);

        if (goal && months) {
            const monthlySave = (goal / months).toFixed(2);
            savingsResult.classList.remove('hidden');
            savingsResult.innerHTML = `You need to save <strong>₹${monthlySave}</strong> per month to reach your goal.`;
        } else {
            savingsResult.classList.remove('hidden');
            savingsResult.innerHTML = "Please enter valid numbers.";
        }
    });

    // EMI Calculator
    const calcEmiBtn = document.getElementById('calc-emi-btn');
    const emiResult = document.getElementById('emi-result');

    calcEmiBtn.addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('loan-amount').value);
        const rate = parseFloat(document.getElementById('loan-rate').value);
        const years = parseFloat(document.getElementById('loan-years').value);

        if (principal && rate && years) {
            const r = rate / 12 / 100; // monthly rate
            const n = years * 12; // months
            
            // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
            const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            
            emiResult.classList.remove('hidden');
            emiResult.innerHTML = `Your estimated monthly EMI is <strong>₹${emi.toFixed(2)}</strong>`;
        } else {
            emiResult.classList.remove('hidden');
            emiResult.innerHTML = "Please enter valid numbers.";
        }
    });

});
