// Mock Data Engine based on Abhilash's Profile Focus
const dashboardData = {
    kpis: [
        { 
            title: "Active Users", value: "24,592", trend: "-2.4% (Delhi Drop)", status: "down",
            insight: "<strong>AI Insight:</strong> Jira #892 & WhatsApp confirm localized power grid maintenance in Connaught Place until 4 PM. footfall dropped 40% there."
        },
        { 
            title: "Today's Onboarding", value: "114", trend: "-15% vs Target", status: "down",
            insight: "<strong>Deep Analysis:</strong> Bigin shows 12 pending KYCs. Mails from IT confirm Gmail's new policy flagged 80 notification emails as spam."
        },
        { 
            title: "Total Swaps (24h)", value: "8,940", trend: "+4.1%", status: "up",
            insight: "<strong>Correlated:</strong> WhatsApp alerts indicate a metro strike in Delhi. BMD confirms 15% higher swap frequency in North Campus."
        },
        { 
            title: "Free Swaps Issued", value: "420", trend: "High anomaly detected", status: "down",
            insight: "<strong>Root Cause:</strong> Nucleus shows Meerut cluster issued 420 swaps. Mails from Ops Lead: 'Compensation for 2hr station downtime'."
        },
        { 
            title: "MTD Revenue", value: "₹42 Lacs", trend: "On Target", status: "neutral",
            insight: "<strong>Forecast:</strong> Metabase projection shows Jaipur & Lucknow exceeding targets by 8% to offset the Delhi grid-loss."
        }
    ],
    exceptions: [
        { id: 1, title: "Stockout: Noida Sec 62 Stn", sub: "Missing 8 batteries. Ongoing for 3h. Revenue impact: ₹4000/hr. No ETA.", analysis: "<strong>AI Root Cause:</strong> BMD shows 20% spike in swaps. Cross-referencing Jira (#889), hardware team ordered late. Supply chain confirms 24hr delay on WhatsApp.", action: "Demand ETA" },
        { id: 2, title: "Station Go-Live Delayed", sub: "Meerut Cantt Phase 2. Stuck in 'Site Readiness' for 14 days.", analysis: "<strong>AI Root Cause:</strong> Nucleus shows missing NOC. Bigin shows follow-up pending. Contractor emailed citing municipal delays.", action: "Demand New ETA" },
        { id: 3, title: "Cash Sitting: Rohit (Field)", sub: "Holding ₹45k for 4 days.", analysis: "<strong>AI Root Cause:</strong> Metabase shows cash collected on 19th. Satori shows no deposit matched. Rohit's supervisor confirmed sick leave on WhatsApp.", action: "Msg Supervisor" }
    ],
    tasks: {
        todo: [
            { id: "T1", title: "Investigate Delhi Onboarding Drop", meta: "Domain: Users", owner: "AI Found" },
            { id: "T2", title: "Review High Free Swaps Issue", meta: "Domain: Revenue", owner: "Assigned" }
        ],
        waiting: [
            { id: "T3", title: "Wait for Franchise Response (Jaipur)", meta: "Domain: Franchise", owner: "Sent to Legal" },
            { id: "T4", title: "Confirm Vendor Payment", meta: "Domain: Procurement", owner: "Finance" }
        ]
    }
};

// UI Controller
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    populateDashboard();
    populateTasks();
    initChat();
    initChart();
    initDummyFeed();
});

function initTabs() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.dataset.tab;
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });
}

function populateDashboard() {
    // Render KPIs
    const kpiGrid = document.querySelector('.kpi-grid');
    kpiGrid.innerHTML = ''; // Clear existing
    dashboardData.kpis.forEach(kpi => {
        kpiGrid.innerHTML += `
            <div class="kpi-card">
                <div class="kpi-title">${kpi.title}</div>
                <div class="kpi-value">${kpi.value}</div>
                <div class="trend ${kpi.status}">${kpi.trend}</div>
                <div class="kpi-insight">${kpi.insight}</div>
            </div>
        `;
    });

    // Render Exceptions
    const excList = document.getElementById('exceptionList');
    excList.innerHTML = ''; // Clear existing
    dashboardData.exceptions.forEach(exc => {
        excList.innerHTML += `
            <li class="exception-item">
                <div class="exc-details">
                    <span class="exc-title">${exc.title}</span>
                    <span class="exc-sub">${exc.sub}</span>
                    <div class="exc-analysis">${exc.analysis}</div>
                </div>
                <button class="pill-btn outline" onclick="simulateAction('${exc.action}', '${exc.title}')">${exc.action}</button>
            </li>
        `;
    });
}

function populateTasks() {
    const todoList = document.getElementById('todoList');
    const waitingList = document.getElementById('waitingList');
    todoList.innerHTML = '';
    waitingList.innerHTML = '';

    dashboardData.tasks.todo.forEach(t => {
        todoList.innerHTML += `<div class="task-card">
            <div class="task-title">${t.title}</div>
            <div class="task-meta"><span>${t.meta}</span><span>${t.owner}</span></div>
        </div>`;
    });

    dashboardData.tasks.waiting.forEach(t => {
        waitingList.innerHTML += `<div class="task-card">
            <div class="task-title">${t.title}</div>
            <div class="task-meta"><span>${t.meta}</span><span>${t.owner}</span></div>
        </div>`;
    });
}

// Mock AI Chat specific to Abhilash's rules
function initChat() {
    const input = document.getElementById('chatInput');
    const btn = document.getElementById('sendBtn');
    const history = document.getElementById('chatHistory');

    const replyMap = {
        "delhi": `
            I've collated data from Bigin, Satori, Metabase, and the Delhi Ops WhatsApp group.
            The <strong>-2.4% drop</strong> in active users is isolated to Connaught Place. 
            <div class="chat-visual">
                <h4>Footfall Analysis (Connaught Place)</h4>
                <div class="mini-table">
                    <table>
                        <tr><td>Yesterday</td><td>4,200</td></tr>
                        <tr><td>Today</td><td>2,520</td></tr>
                        <tr><td>Impact</td><td style="color:var(--error)">-40%</td></tr>
                    </table>
                </div>
                <div class="mini-status-bar"><div class="mini-status-fill error" style="width: 60%"></div></div>
            </div>
            Jira ticket #892 confirms localized power grid maintenance until 4 PM. Should I pause ads or notify the Ops Manager?`,
        
        "noida": `
            Deep research into Jira, Nucleus, and recent WhatsApp logs reveals the Noida Sec 62 stockout root cause. 
            A <strong>20% swap spike</strong> (BMD data) hit while the supply truck was delayed (WhatsApp: "Driver breakdown").
            <div class="chat-visual">
                <h4>Stock Recovery Status</h4>
                <div class="mini-status-bar"><div class="mini-status-fill warning" style="width: 35%"></div></div>
                <p style="font-size:0.7rem; margin-top:4px; color:var(--text-secondary)">35% Inventory Remaining • Est. Recovery: 18h</p>
            </div>
            Jira #889 shows the hardware team re-ordered late. I can draft an escalation for the vendor.`,
        
        "meerut": `
            Analyzing Nucleus, Bigin, and contractor emails: Meerut Cantt Phase 2 is stalled on NOC Site Readiness.
            <div class="chat-visual">
                <h4>NOC Checklist</h4>
                <div class="mini-table">
                    <table>
                        <tr><td>Fire Safety</td><td>✅ Done</td></tr>
                        <tr><td>Municipal NOC</td><td>⏳ Pending</td></tr>
                        <tr><td>Electrical Cert</td><td>✅ Done</td></tr>
                    </table>
                </div>
            </div>
            The contractor citing municipal delays in yesterday's mail. I can push for a hard deadline.`,
        
        "jaipur": "Cross-referencing Satori and Legal emails: We are waiting for franchise response from Jaipur Pink City. Legal sent the draft 3 days ago. Should I trigger an automated follow-up via Bigin?",
        "lucknow": "Collating BMD and WhatsApp data: Lucknow operations are stable, though Hazratganj station is seeing high swap volumes today. No stockouts predicted yet.",
        "yes": "Executing action: Ads paused for Connaught Place via Marketing API. Sending message to Ops Manager via WhatsApp. I have also logged a pending Task in your Dashboard.",
        "no": "Understood. Action cancelled. I'll keep monitoring the integrated dashboards."
    };

    function processMessage() {
        const text = input.value.trim();
        if(!text) return;
        
        // Add User message
        history.innerHTML += `
            <div class="message user-message">
                <div class="msg-avatar">A</div>
                <div class="msg-content"><p>${text}</p></div>
            </div>`;
        input.value = '';
        history.scrollTop = history.scrollHeight;

        // Process AI Response
        setTimeout(() => {
            // Add thinking indicator with step-by-step logs
            const thinkingDiv = document.createElement('div');
            thinkingDiv.className = 'message ai-message temp-thinking';
            thinkingDiv.innerHTML = `
                <div class="msg-avatar">AI</div>
                <div class="msg-content">
                    <p style="color:var(--accent); font-size:0.8rem;">
                        <span id="log1">● Scanning WhatsApp groups...</span><br>
                        <span id="log2" style="opacity:0.5">○ Fetching Jira #892 & #889...</span><br>
                        <span id="log3" style="opacity:0.5">○ Querying Metabase & Satori...</span>
                    </p>
                </div>`;
            history.appendChild(thinkingDiv);
            history.scrollTop = history.scrollHeight;

            // Animate logs
            setTimeout(() => document.getElementById('log2').style.opacity = '1', 400);
            setTimeout(() => document.getElementById('log3').style.opacity = '1', 800);

            setTimeout(() => {
                const tempMsg = document.querySelector('.temp-thinking');
                if(tempMsg) tempMsg.remove();

                let aiResponse = "I've cross-referenced Bigin, Jira, Nucleus, Metabase, Satori, BMD, and WhatsApp. I can provide the actual root cause for metrics or ping the respective managers. Let me know how to proceed.";
                const lowerText = text.toLowerCase();
                
                for(const [key, val] of Object.entries(replyMap)) {
                    if(lowerText.includes(key)) {
                        aiResponse = val; break;
                    }
                }

                history.innerHTML += `
                    <div class="message ai-message">
                        <div class="msg-avatar">AI</div>
                        <div class="msg-content"><p>${aiResponse}</p></div>
                    </div>`;
                history.scrollTop = history.scrollHeight;
                
                // Automation Hook simulation
                if(lowerText.includes('yes')) {
                    document.getElementById('waitingList').innerHTML += `
                        <div class="task-card" style="border-color: var(--warning);">
                            <div class="task-title">Awaiting: Root Cause from Suresh (Delhi)</div>
                            <div class="task-meta"><span>Domain: Users Updates</span><span>Pending ETA</span></div>
                        </div>
                    `;
                }
            }, 1000);
        }, 500);
    }

    btn.addEventListener('click', processMessage);
    input.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') processMessage();
    });
    
    window.simulateAction = function(actionName, contextTitle) {
        document.querySelector('.nav-links li[data-tab="chat"]').click();
        const chatInput = document.getElementById('chatInput');
        chatInput.value = `Please ${actionName.toLowerCase()} regarding ${contextTitle}.`;
        document.getElementById('sendBtn').click();
    };
}

function initChart() {
    const ctx = document.getElementById('dummyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Revenue Trend (Mock)',
                data: [12, 19, 25, 42],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            },
            {
                label: 'OpEx Trend (Mock)',
                data: [10, 15, 18, 22],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#a1a1aa' }
                }
            },
            scales: {
                y: {
                    grid: { color: '#27272a' },
                    ticks: { color: '#a1a1aa' }
                },
                x: {
                    grid: { color: '#27272a' },
                    ticks: { color: '#a1a1aa' }
                }
            }
        }
    });
}

function initDummyFeed() {
    const feed = document.getElementById('dummyDataFeed');
    const systems = ['Bigin', 'Jira', 'Nucleus', 'Metabase', 'Satori', 'BMD', 'WhatsApp'];
    const events = ['Ticket_Created', 'Swap_Completed', 'Msg_Received', 'Auth_Success', 'NOC_Pending'];

    function addDummyRow() {
        const time = new Date().toLocaleTimeString();
        const sys = systems[Math.floor(Math.random() * systems.length)];
        const evt = events[Math.floor(Math.random() * events.length)];
        const payload = `{"id":"DUMMY-${Math.floor(Math.random()*1000)}", "status":"mocked_data"}`;

        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border)';
        tr.innerHTML = `
            <td style="padding: 8px; color: var(--text-secondary);">${time}</td>
            <td style="padding: 8px; color: var(--accent);">${sys}</td>
            <td style="padding: 8px;">${evt}</td>
            <td style="padding: 8px; font-family: monospace; color: var(--text-secondary);">${payload}</td>
        `;
        
        feed.prepend(tr);
        if (feed.children.length > 20) {
            feed.removeChild(feed.lastChild);
        }
    }

    // Add initial rows
    for(let i=0; i<5; i++) addDummyRow();

    // Add new rows periodically
    setInterval(addDummyRow, 3000);
}
