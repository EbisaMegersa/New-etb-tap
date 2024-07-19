let balance = 0.0;
const incrementValue = 0.003;
const adminId = '2019124349'; // Replace with actual admin Telegram ID

document.addEventListener('DOMContentLoaded', () => {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    if (user) {
        let username = user.username || user.first_name || 'Unknown';
        if (username.length > 10) {
            username = username.substring(0, 10) + '...';
        }
        document.getElementById('username-value').innerText = username;

        // Fetch balance from localStorage
        const storedBalance = localStorage.getItem(`balance_${user.id}`);
        if (storedBalance !== null) {
            balance = parseFloat(storedBalance);
        }
        updateDisplay();

        // Show or hide the stats button based on admin status
        if (user.id.toString() === adminId) {
            document.getElementById('stats').style.display = 'block';
        } else {
            document.getElementById('stats').style.display = 'none';
        }
    } else {
        alert("Unable to get Telegram user info.");
    }
});

document.getElementById('main-img').addEventListener('touchstart', (event) => {
    const mainImg = document.getElementById('main-img');

    // Prevent the default behavior to ensure the app handles the touch event correctly
    event.preventDefault();

    // Loop through each touch point
    for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];

        // Add the tapped effect
        mainImg.classList.add('tapped');
        setTimeout(() => {
            mainImg.classList.remove('tapped');
        }, 300); // Match this duration with the CSS transition time

        createFloatingText(touch.clientX, touch.clientY, '+0.003 ETB');

        balance += incrementValue;
        updateDisplay();

        const user = window.Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            localStorage.setItem(`balance_${user.id}`, balance.toFixed(4));
        }
    }
});

document.getElementById('tap').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('boost').addEventListener('click', () => {
    showPopup("በቅርብ ቀን!\nComing Soon!");
});

document.getElementById('frens').addEventListener('click', () => {
    showPopup("Referall link ለማግኘት ይሄንን step ይከታተሉ!\n1 ቦቱን /start ይበሉት\n2 ቻናላችንን ይቀላቀሉ \n3 የሚመጣዉን ጥያቄ በመመለስ ወደ ቦቱ ዉስጥ ይግቡ\n4 ከዛ ጓደኞችዎን ይጋብዙ ሚለውን Button በመጫን የርሶን መጋበዣ link ማግኘት ትችላላችሁ!");
});

document.getElementById('task').addEventListener('click', () => {
    showPopup("በቅርብ ቀን!\nComing Soon!");
});

document.getElementById('stats').addEventListener('click', () => {
    window.location.href = 'stats.html';
});

function createFloatingText(x, y, text) {
    const floatingText = document.createElement('div');
    floatingText.innerText = text;
    floatingText.style.position = 'absolute';
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingText.style.color = '#ffffff';
    floatingText.style.fontSize = '24px';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.zIndex = '1000';
    floatingText.style.transition = 'all 0.5s ease-out';
    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.style.transform = 'translateY(-70px)';
        floatingText.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        floatingText.remove();
    }, 1050);
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    popup.innerText = message;
    popup.classList.remove('hide');
    popup.classList.add('show');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hide');
        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('hide'); // Clean up after hiding
        }, 500); // Match this duration with the CSS transition time
    }, 5000); // Duration the popup is visible
}

function updateDisplay() {
    document.getElementById('balance-value').innerText = balance.toFixed(4);
}