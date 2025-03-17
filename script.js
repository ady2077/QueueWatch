// Initialize particles
particlesJS('particles-js', {
    particles: {
        number: { value: 130, density: { enable: true, value_area: 800 } },
        color: { value: '#ffd700' }, // Gold particles
        shape: { type: 'star' },
        opacity: { value: 0.7, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#800080', opacity: 0.4, width: 2 },
        move: { enable: true, speed: 4, direction: 'none', random: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'push' } },
        modes: { bubble: { distance: 200, size: 6 }, push: { particles_nb: 5 } }
    },
    retina_detect: true
});

const queue = [];
let taskId = 0;

function addTask() {
    const taskText = document.getElementById('taskInput').value;
    if (!taskText) return;

    const isPriority = document.getElementById('priority').checked;
    const startTime = Date.now();
    const task = { id: taskId++, text: taskText, priority: isPriority, startTime };

    queue.push(task);
    document.getElementById('taskInput').value = '';
    updateQueue();

    // Simulate task completion after random time (2-5s)
    setTimeout(() => {
        completeTask(task.id);
    }, Math.random() * 3000 + 2000);
}

function completeTask(id) {
    const index = queue.findIndex(task => task.id === id);
    if (index !== -1) {
        queue.splice(index, 1);
        updateQueue();
    }
}

function clearQueue() {
    queue.length = 0;
    updateQueue();
}

function togglePriority() {
    // Just updates UI when checked
}

function updateQueue() {
    const queueList = document.getElementById('taskQueue');
    const queueSize = document.getElementById('queueSize');
    queueList.innerHTML = '';

    queue.forEach(task => {
        const elapsed = Math.floor((Date.now() - task.startTime) / 1000);
        const li = document.createElement('li');
        li.textContent = `${task.text} (${elapsed}s)${task.priority ? ' [Priority]' : ''}`;
        if (task.priority) li.classList.add('priority');
        queueList.appendChild(li);
    });

    queueSize.textContent = `Queue Size: ${queue.length}`;
    if (queue.length > 5) {
        queueSize.innerHTML = `<span style="color: #ff6b6b; animation: alertFlash 0.5s infinite;">Queue Size: ${queue.length} (High!)</span>`;
    }
}

// Alert flash animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes alertFlash {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);