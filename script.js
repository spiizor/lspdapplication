// Tab Management
let currentTab = 'main-application';
let tabDebounceTimeouts = {};

function switchTab(tabId) {
    // Hide all tab panes
    const allPanes = document.querySelectorAll('.tab-pane');
    allPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab
    const selectedPane = document.getElementById(tabId);
    if (selectedPane) {
        selectedPane.classList.add('active');
        currentTab = tabId;
    }
    
    // Add active class to clicked button
    const clickedButton = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Enhanced auto-save function to handle all form elements including dynamic rows
function autoSaveDraft() {
    const formData = {
        currentTab: currentTab,
        tabs: {}
    };

    // Save data for each tab
    const tabs = ['main-application', 'standard-firearm', 'priors-firearm', 'shotgun-license', 
                  'firearm-change', 'firearm-submission', 'missing-firearm', 'guard-card',
                  'reinstatement', 'transfer', 'complaint', 'commendation', 'roleplay-feedback',
				  'press inquiries', 'public-inquiries', 'press-passes', 'self-background-check',
				  'company-background-check', 'report-crime', 'bounty-report', 'road-closure-permit',
				  'ride-along-program'];
    
    tabs.forEach(tabId => {
        const tabData = {
            inputs: {},
            radioButtons: {},
            checkboxes: {}
        };
        
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
            // Save inputs and textareas
            tabElement.querySelectorAll("input[type='text'], input[type='date'], input[type='time'], input[type='datetime-local'], input[type='number'], textarea, select").forEach(element => {
                if (element.id) {
                    tabData.inputs[element.id] = element.value;
                }
            });
            
            // Save radio buttons
            tabElement.querySelectorAll("input[type='radio']").forEach(radio => {
                if (radio.name && radio.checked) {
                    tabData.radioButtons[radio.name] = radio.value;
                }
            });
            
            // Save checkboxes
            tabElement.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
                if (checkbox.id) {
                    tabData.checkboxes[checkbox.id] = checkbox.checked;
                }
            });
        }
        
        formData.tabs[tabId] = tabData;
    });
    
    // Save dynamic data for all tabs
// Main application
if (document.getElementById('main-application')) {
    formData.tabs['main-application'].employmentRows = [];
    formData.tabs['main-application'].factionRows = [];
    
    // Save employment rows
    const employmentContainers = document.querySelectorAll('.employmentContainer');
    employmentContainers.forEach(container => {
        const row = {
            companyName: container.querySelector('input[name="companyName[]"]')?.value || '',
            position: container.querySelector('input[name="position[]"]')?.value || '',
            directSupervisor: container.querySelector('input[name="directSupervisor[]"]')?.value || '',
            termOfEmployment: container.querySelector('input[name="termOfEmployment[]"]')?.value || '',
            summaryOfDuties: container.querySelector('textarea[name="summaryOfDuties[]"]')?.value || '',
            reasonForLeaving: container.querySelector('textarea[name="reasonForLeaving[]"]')?.value || ''
        };
        formData.tabs['main-application'].employmentRows.push(row);
    });
    
    // Save faction rows
    const factionRows = document.querySelectorAll('.faction-row');
    factionRows.forEach(row => {
        const factionData = {
            characterName: row.querySelector('input[name="characterName[]"]')?.value || '',
            faction: row.querySelector('input[name="faction[]"]')?.value || ''
        };
        formData.tabs['main-application'].factionRows.push(factionData);
    });
}

// Complaint
if (document.getElementById('complaint')) {
    formData.tabs['complaint'].employees = [];
    document.querySelectorAll('#complaintEmployeeSection .employee-group').forEach(group => {
        const employee = {
            name: group.querySelector('input[name="co_empName[]"]')?.value || '',
            rank: group.querySelector('input[name="co_empRank[]"]')?.value || '',
            badge: group.querySelector('input[name="co_empBadge[]"]')?.value || '',
            other: group.querySelector('input[name="co_empOther[]"]')?.value || ''
        };
        formData.tabs['complaint'].employees.push(employee);
    });
}

// Commendation
if (document.getElementById('commendation')) {
    formData.tabs['commendation'].employees = [];
    document.querySelectorAll('#commendationEmployeeSection .employee-group').forEach(group => {
        const employee = {
            name: group.querySelector('input[name="cm_empName[]"]')?.value || '',
            rank: group.querySelector('input[name="cm_empRank[]"]')?.value || '',
            badge: group.querySelector('input[name="cm_empBadge[]"]')?.value || '',
            other: group.querySelector('input[name="cm_empOther[]"]')?.value || ''
        };
        formData.tabs['commendation'].employees.push(employee);
    });
}

// Roleplay Feedback
if (document.getElementById('roleplay-feedback')) {
    formData.tabs['roleplay-feedback'].lspdPointsRows = [];
    formData.tabs['roleplay-feedback'].playerPointsRows = [];
    
    const lspdPoints = document.getElementsByName('rf_lspdPoints[]');
    lspdPoints.forEach(input => {
        formData.tabs['roleplay-feedback'].lspdPointsRows.push(input.value || '');
    });
    
    const playerPoints = document.getElementsByName('rf_playerPoints[]');
    playerPoints.forEach(input => {
        formData.tabs['roleplay-feedback'].playerPointsRows.push(input.value || '');
    });
}

// Company Background Check
if (document.getElementById('company-background-check')) {
    formData.tabs['company-background-check'].employeeRows = [];
    formData.tabs['company-background-check'].prospectiveRows = [];
    
    const employees = document.getElementsByName('cbc_employees[]');
    employees.forEach(input => {
        formData.tabs['company-background-check'].employeeRows.push(input.value || '');
    });
    
    const prospectives = document.getElementsByName('cbc_prospective[]');
    prospectives.forEach(input => {
        formData.tabs['company-background-check'].prospectiveRows.push(input.value || '');
    });
}

// Bounty Report
if (document.getElementById('bounty-report')) {
    formData.tabs['bounty-report'].propertyRows = [];
    formData.tabs['bounty-report'].affiliationRows = [];
    formData.tabs['bounty-report'].suspectRows = [];
    formData.tabs['bounty-report'].vehicleRows = [];
    formData.tabs['bounty-report'].mediaRows = [];
    
    const properties = document.getElementsByName('br_property[]');
    properties.forEach(input => {
        formData.tabs['bounty-report'].propertyRows.push(input.value || '');
    });
    
    const affiliations = document.getElementsByName('br_affiliations[]');
    affiliations.forEach(input => {
        formData.tabs['bounty-report'].affiliationRows.push(input.value || '');
    });
    
    const suspects = document.getElementsByName('br_suspects[]');
    suspects.forEach(input => {
        formData.tabs['bounty-report'].suspectRows.push(input.value || '');
    });
    
    const vehicles = document.getElementsByName('br_vehicles[]');
    vehicles.forEach(input => {
        formData.tabs['bounty-report'].vehicleRows.push(input.value || '');
    });
    
    const mediaLinks = document.getElementsByName('br_mediaLink[]');
    const mediaDescs = document.getElementsByName('br_mediaDesc[]');
    for (let i = 0; i < mediaLinks.length; i++) {
        formData.tabs['bounty-report'].mediaRows.push({
            link: mediaLinks[i]?.value || '',
            desc: mediaDescs[i]?.value || ''
        });
    }
}

    localStorage.setItem("lspdApplicationDraft", JSON.stringify(formData));

    // Show auto-save status
    const status = document.getElementById("autoSaveStatus");
    if (status) {
        status.textContent = "Draft auto-saved.";
        status.classList.add("visible");
        setTimeout(() => status.classList.remove("visible"), 2000);
    }
}

// Debounce function
function debounceAutoSave(event) {
    if (!tabDebounceTimeouts[currentTab]) {
        tabDebounceTimeouts[currentTab] = null;
    }
    
    clearTimeout(tabDebounceTimeouts[currentTab]);
    tabDebounceTimeouts[currentTab] = setTimeout(() => {
        autoSaveDraft();
    }, 1000);
}

// Function to re-attach event listeners to dynamically added content
function onDynamicContentAdded() {
    setupAutoSave();
}

// Setup auto-save event listeners
function setupAutoSave() {
    const formElements = document.querySelectorAll("input, textarea, select");
    
    formElements.forEach(element => {
        // Remove existing listeners to avoid duplicates
        element.removeEventListener("input", debounceAutoSave);
        element.removeEventListener("change", debounceAutoSave);
        
        // Add event listeners
        element.addEventListener("input", debounceAutoSave);
        element.addEventListener("change", debounceAutoSave);
    });
}

// Enhanced load function to restore all saved data
function loadDraftOnPageLoad() {
    const savedDataString = localStorage.getItem("lspdApplicationDraft");
    
    if (!savedDataString) {
        // Check for old format
        const oldData = localStorage.getItem("applicationDraft");
        if (oldData) {
            loadOldFormatData(oldData);
        }
        return;
    }
    
    try {
        const savedData = JSON.parse(savedDataString);
        
        // Restore each tab's data
        Object.keys(savedData.tabs).forEach(tabId => {
            const tabData = savedData.tabs[tabId];
            const tabElement = document.getElementById(tabId);
            
            if (tabElement && tabData) {
                // Restore regular inputs
                if (tabData.inputs) {
                    Object.keys(tabData.inputs).forEach(id => {
                        const element = document.getElementById(id);
                        if (element) {
                            element.value = tabData.inputs[id];
                        }
                    });
                }
                
                // Restore radio buttons
                if (tabData.radioButtons) {
                    Object.keys(tabData.radioButtons).forEach(name => {
                        const radio = tabElement.querySelector(`input[name="${name}"][value="${tabData.radioButtons[name]}"]`);
                        if (radio) {
                            radio.checked = true;
                        }
                    });
                }
                
                // Restore checkboxes
                if (tabData.checkboxes) {
                    Object.keys(tabData.checkboxes).forEach(id => {
                        const checkbox = document.getElementById(id);
                        if (checkbox) {
                            checkbox.checked = tabData.checkboxes[id];
                        }
                    });
                }
                
                // Restore dynamic content for main application
                if (tabId === 'main-application') {
                    if (tabData.employmentRows && tabData.employmentRows.length > 0) {
                        const employmentSection = document.getElementById("employmentSection");
                        employmentSection.innerHTML = '';
                        
                        tabData.employmentRows.forEach(row => {
                            const newRow = document.createElement("div");
                            newRow.classList.add("employmentContainer");
                            
                            newRow.innerHTML = `
                                <label>Company Name:</label>
                                <input type="text" name="companyName[]" placeholder="Enter company name" value="${row.companyName || ''}">

                                <label>Position:</label>
                                <input type="text" name="position[]" placeholder="Enter position" value="${row.position || ''}">

                                <label>Direct Supervisor:</label>
                                <input type="text" name="directSupervisor[]" placeholder="Enter direct supervisor" value="${row.directSupervisor || ''}">

                                <label>Term of Employment:</label>
                                <input type="text" name="termOfEmployment[]" placeholder="DD/MON/YYYY to DD/MON/YYYY" value="${row.termOfEmployment || ''}">

                                <label>Summary of Duties:</label>
                                <textarea name="summaryOfDuties[]" rows="3" placeholder="Describe duties">${row.summaryOfDuties || ''}</textarea>

                                <label>Reason for Leaving:</label>
                                <textarea name="reasonForLeaving[]" rows="3" placeholder="Reason for leaving">${row.reasonForLeaving || ''}</textarea>
                            `;
                            
                            employmentSection.appendChild(newRow);
                        });
                    }
                    
                    if (tabData.factionRows && tabData.factionRows.length > 0) {
                        const factionContainer = document.getElementById("factionContainer");
                        factionContainer.innerHTML = '';
                        
                        tabData.factionRows.forEach(row => {
                            const newRow = document.createElement("div");
                            newRow.classList.add("faction-row");
                            
                            newRow.innerHTML = `
                                <input type="text" name="characterName[]" placeholder="Character Name" value="${row.characterName || ''}">
                                <input type="text" name="faction[]" placeholder="Faction" value="${row.faction || ''}">
                            `;
                            
                            factionContainer.appendChild(newRow);
                        });
                    }
                }
                
                // Restore complaint employees
                if (tabId === 'complaint' && tabData.employees && tabData.employees.length > 0) {
                    const section = document.getElementById('complaintEmployeeSection');
                    section.innerHTML = '';
                    
                    tabData.employees.forEach((emp, index) => {
                        const group = document.createElement('div');
                        group.classList.add('employee-group');
                        group.innerHTML = `
                            <h4>Employee ${index + 1}</h4>
                            <div class="form-group">
                                <label>FULL NAME: <span class="optional">(Optional)</span></label>
                                <input type="text" name="co_empName[]" placeholder="Answer" value="${emp.name || ''}">
                            </div>
                            <div class="form-group">
                                <label>RANK: <span class="optional">(Optional)</span></label>
                                <input type="text" name="co_empRank[]" placeholder="Answer" value="${emp.rank || ''}">
                            </div>
                            <div class="form-group">
                                <label>BADGE NUMBER: <span class="optional">(Optional)</span></label>
                                <input type="text" name="co_empBadge[]" placeholder="Answer" value="${emp.badge || ''}">
                            </div>
                            <div class="form-group">
                                <label>OTHER: <span class="optional">(Optional)</span></label>
                                <input type="text" name="co_empOther[]" placeholder="Answer" value="${emp.other || ''}">
                            </div>
                        `;
                        section.appendChild(group);
                    });
                }
                
                // Restore commendation employees
                if (tabId === 'commendation' && tabData.employees && tabData.employees.length > 0) {
                    const section = document.getElementById('commendationEmployeeSection');
                    section.innerHTML = '';
                    
                    tabData.employees.forEach((emp, index) => {
                        const group = document.createElement('div');
                        group.classList.add('employee-group');
                        group.innerHTML = `
                            <h4>Employee ${index + 1}</h4>
                            <div class="form-group">
                                <label>FULL NAME: <span class="optional">(Optional)</span></label>
                                <input type="text" name="cm_empName[]" placeholder="Answer" value="${emp.name || ''}">
                            </div>
                            <div class="form-group">
                                <label>RANK: <span class="optional">(Optional)</span></label>
                                <input type="text" name="cm_empRank[]" placeholder="Answer" value="${emp.rank || ''}">
                            </div>
                            <div class="form-group">
                                <label>BADGE NUMBER: <span class="optional">(Optional)</span></label>
                                <input type="text" name="cm_empBadge[]" placeholder="Answer" value="${emp.badge || ''}">
                            </div>
                            <div class="form-group">
                                <label>OTHER: <span class="optional">(Optional)</span></label>
                                <input type="text" name="cm_empOther[]" placeholder="Answer" value="${emp.other || ''}">
                            </div>
                        `;
                        section.appendChild(group);
                    });
                }
            }
			
			// Restore roleplay feedback dynamic rows
if (tabId === 'roleplay-feedback') {
    if (tabData.lspdPointsRows && tabData.lspdPointsRows.length > 0) {
        const lspdContainer = document.getElementById('rf_lspdPointsContainer');
        lspdContainer.innerHTML = '';
        
        tabData.lspdPointsRows.forEach((value, index) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'rf_lspdPoints[]';
            newInput.placeholder = `Item ${index + 1}`;
            newInput.style.marginBottom = '8px';
            newInput.required = index < 3; // First 3 are required
            newInput.value = value || '';
            lspdContainer.appendChild(newInput);
        });
    }
    
    if (tabData.playerPointsRows && tabData.playerPointsRows.length > 0) {
        const playerContainer = document.getElementById('rf_playerPointsContainer');
        playerContainer.innerHTML = '';
        
        tabData.playerPointsRows.forEach((value, index) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'rf_playerPoints[]';
            newInput.placeholder = `Item ${index + 1}`;
            newInput.style.marginBottom = '8px';
            newInput.required = index < 3; // First 3 are required
            newInput.value = value || '';
            playerContainer.appendChild(newInput);
        });
    }
}

// Restore company background check dynamic rows
if (tabId === 'company-background-check') {
    if (tabData.employeeRows && tabData.employeeRows.length > 0) {
        const employeeContainer = document.getElementById('cbc_employeesContainer');
        employeeContainer.innerHTML = '';
        
        tabData.employeeRows.forEach((value) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'cbc_employees[]';
            newInput.placeholder = 'Fname Lname';
            newInput.style.marginBottom = '8px';
            newInput.value = value || '';
            employeeContainer.appendChild(newInput);
        });
    }
    
    if (tabData.prospectiveRows && tabData.prospectiveRows.length > 0) {
        const prospectiveContainer = document.getElementById('cbc_prospectiveContainer');
        prospectiveContainer.innerHTML = '';
        
        tabData.prospectiveRows.forEach((value) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'cbc_prospective[]';
            newInput.placeholder = 'Fname Lname';
            newInput.style.marginBottom = '8px';
            newInput.value = value || '';
            prospectiveContainer.appendChild(newInput);
        });
    }
}

// Restore bounty report dynamic rows
if (tabId === 'bounty-report') {
    if (tabData.propertyRows && tabData.propertyRows.length > 0) {
        const propertyContainer = document.getElementById('br_propertyContainer');
        propertyContainer.innerHTML = '';
        
        tabData.propertyRows.forEach((value, index) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'br_property[]';
            newInput.placeholder = '# StreetName';
            newInput.style.marginBottom = '8px';
            newInput.required = index === 0; // First one is required
            newInput.value = value || '';
            propertyContainer.appendChild(newInput);
        });
    }
    
    if (tabData.affiliationRows && tabData.affiliationRows.length > 0) {
        const affiliationContainer = document.getElementById('br_affiliationsContainer');
        affiliationContainer.innerHTML = '';
        
        tabData.affiliationRows.forEach((value) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'br_affiliations[]';
            newInput.placeholder = 'CRIMINAL ORGANIZATION OR GANG NAME';
            newInput.style.marginBottom = '8px';
            newInput.value = value || '';
            affiliationContainer.appendChild(newInput);
        });
    }
    
    if (tabData.suspectRows && tabData.suspectRows.length > 0) {
        const suspectContainer = document.getElementById('br_suspectsContainer');
        suspectContainer.innerHTML = '';
        
        tabData.suspectRows.forEach((value) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'br_suspects[]';
            newInput.placeholder = 'Firstname Lastname - Description';
            newInput.style.marginBottom = '8px';
            newInput.value = value || '';
            suspectContainer.appendChild(newInput);
        });
    }
    
    if (tabData.vehicleRows && tabData.vehicleRows.length > 0) {
        const vehicleContainer = document.getElementById('br_vehiclesContainer');
        vehicleContainer.innerHTML = '';
        
        tabData.vehicleRows.forEach((value) => {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.name = 'br_vehicles[]';
            newInput.placeholder = 'Model, Color, Plate, Other Details';
            newInput.style.marginBottom = '8px';
            newInput.value = value || '';
            vehicleContainer.appendChild(newInput);
        });
    }
    
    if (tabData.mediaRows && tabData.mediaRows.length > 0) {
        const mediaContainer = document.getElementById('br_mediaContainer');
        mediaContainer.innerHTML = '';
        
        tabData.mediaRows.forEach((media) => {
            const newRow = document.createElement('div');
            newRow.className = 'media-row';
            newRow.style.display = 'flex';
            newRow.style.gap = '8px';
            newRow.style.marginBottom = '8px';
            newRow.innerHTML = `
                <input type="text" name="br_mediaLink[]" placeholder="LINK HERE" style="flex: 1;" value="${media.link || ''}">
                <input type="text" name="br_mediaDesc[]" placeholder="Description of Provided Media" style="flex: 2;" value="${media.desc || ''}">
            `;
            mediaContainer.appendChild(newRow);
        });
    }
}
        });
        
        // Update conditional field requirements after loading
        updateConditionalRequirements();
        
        // Restore active tab
        if (savedData.currentTab) {
            switchTab(savedData.currentTab);
        }
        
        console.log("Draft loaded successfully.");
    } catch (error) {
        console.error("Error loading draft:", error);
    }
}

// Load old format data (for backward compatibility)
function loadOldFormatData(oldDataString) {
    try {
        const oldData = JSON.parse(oldDataString);
        
        // Convert old format to new format
        const newData = {
            currentTab: 'main-application',
            tabs: {
                'main-application': {
                    inputs: oldData.inputs || {},
                    radioButtons: oldData.radioButtons || {},
                    checkboxes: oldData.checkboxes || {},
                    employmentRows: oldData.employmentRows || [],
                    factionRows: oldData.factionRows || []
                }
            }
        };
        
        // Save in new format
        localStorage.setItem("lspdApplicationDraft", JSON.stringify(newData));
        
        // Remove old format data
        localStorage.removeItem("applicationDraft");
        
        // Load using new format
        loadDraftOnPageLoad();
    } catch (error) {
        console.error("Error converting old format data:", error);
    }
}

// Update conditional requirements based on selections
function updateConditionalRequirements() {
    // Update 3.3.1 requirement
    const criminalMisdemeanors = document.getElementById("criminalMisdemeanors");
    const criminalFelonies = document.getElementById("criminalFelonies");
    const criminalDetailsRequired = document.getElementById("criminalDetailsRequired");
    const criminalRecordDetails = document.getElementById("criminalRecordDetails");
    
    if (criminalMisdemeanors?.checked || criminalFelonies?.checked) {
        criminalDetailsRequired.textContent = "(Required)";
        criminalDetailsRequired.classList.remove("optional");
        criminalDetailsRequired.classList.add("required");
        criminalRecordDetails.setAttribute("required", "required");
    } else {
        criminalDetailsRequired.textContent = "(Optional)";
        criminalDetailsRequired.classList.remove("required");
        criminalDetailsRequired.classList.add("optional");
        criminalRecordDetails.removeAttribute("required");
    }
    
    // Update 5.2.1 requirement
    const lspdYes = document.querySelector('input[name="lspdFaction"][value="Yes"]');
    const reinstatementRequired = document.getElementById("reinstatementRequired");
    const reinstatementApp = document.getElementById("reinstatementApp");
    
    if (lspdYes?.checked) {
        reinstatementRequired.textContent = "(Required)";
        reinstatementRequired.classList.remove("optional");
        reinstatementRequired.classList.add("required");
        reinstatementApp.setAttribute("required", "required");
    } else {
        reinstatementRequired.textContent = "(Optional)";
        reinstatementRequired.classList.remove("required");
        reinstatementRequired.classList.add("optional");
        reinstatementApp.removeAttribute("required");
    }
    
    // Update 5.5.1 requirement
    const factionServerYesBut = document.querySelector('input[name="factionServer"][value="yesBut"]');
    const factionServerYesAnd = document.querySelector('input[name="factionServer"][value="yesAnd"]');
    const factionServerRequired = document.getElementById("factionServerRequired");
    const factionServerExplanation = document.getElementById("factionServerExplanation");
    
    if (factionServerYesBut?.checked || factionServerYesAnd?.checked) {
        factionServerRequired.textContent = "(Required)";
        factionServerRequired.classList.remove("optional");
        factionServerRequired.classList.add("required");
        factionServerExplanation.setAttribute("required", "required");
    } else {
        factionServerRequired.textContent = "(Optional)";
        factionServerRequired.classList.remove("required");
        factionServerRequired.classList.add("optional");
        factionServerExplanation.removeAttribute("required");
    }
    
    // Update 5.6.1 requirement
    const obligationsYes = document.querySelector('input[name="obligations"][value="Yes"]');
    const obligationsRequired = document.getElementById("obligationsRequired");
    const availabilityExplanation = document.getElementById("availabilityExplanation");
    
    if (obligationsYes?.checked) {
        obligationsRequired.textContent = "(Required)";
        obligationsRequired.classList.remove("optional");
        obligationsRequired.classList.add("required");
        availabilityExplanation.setAttribute("required", "required");
    } else {
        obligationsRequired.textContent = "(Optional)";
        obligationsRequired.classList.remove("required");
        obligationsRequired.classList.add("optional");
        availabilityExplanation.removeAttribute("required");
    }
    
    // Update 5.7.1 requirement
    const microphoneNo = document.querySelector('input[name="microphone"][value="No"]');
    const microphoneRequired = document.getElementById("microphoneRequired");
    const microphoneExplanation = document.getElementById("microphoneExplanation");
    
    if (microphoneNo?.checked) {
        microphoneRequired.textContent = "(Required)";
        microphoneRequired.classList.remove("optional");
        microphoneRequired.classList.add("required");
        microphoneExplanation.setAttribute("required", "required");
    } else {
        microphoneRequired.textContent = "(Optional)";
        microphoneRequired.classList.remove("required");
        microphoneRequired.classList.add("optional");
        microphoneExplanation.removeAttribute("required");
    }
}

// Update BLS individuals requirement based on selection
function updateBLSRequirement() {
    const blsYes = document.querySelector('input[name="rcp_blsCertified"][value="yes"]');
    const blsIndividualsLabel = document.querySelector('label[for="rcp_blsIndividuals"]');
    const blsIndividualsInput = document.getElementById('rcp_blsIndividuals');
    const blsRequiredSpan = document.getElementById('blsIndividualsRequired');
    
    if (blsYes?.checked) {
        if (blsRequiredSpan) {
            blsRequiredSpan.textContent = "(Required)";
            blsRequiredSpan.classList.remove("optional");
            blsRequiredSpan.classList.add("required");
        }
        if (blsIndividualsInput) {
            blsIndividualsInput.setAttribute("required", "required");
        }
    } else {
        if (blsRequiredSpan) {
            blsRequiredSpan.textContent = "(Optional)";
            blsRequiredSpan.classList.remove("required");
            blsRequiredSpan.classList.add("optional");
        }
        if (blsIndividualsInput) {
            blsIndividualsInput.removeAttribute("required");
        }
    }
}

// Set up event listeners for conditional fields
function setupConditionalListeners() {
    // Criminal record checkboxes
    document.getElementById("criminalMisdemeanors")?.addEventListener("change", updateConditionalRequirements);
    document.getElementById("criminalFelonies")?.addEventListener("change", updateConditionalRequirements);
    
    // Radio button groups
    document.querySelectorAll('input[name="lspdFaction"]').forEach(radio => {
        radio.addEventListener("change", updateConditionalRequirements);
    });
    
    document.querySelectorAll('input[name="factionServer"]').forEach(radio => {
        radio.addEventListener("change", updateConditionalRequirements);
    });
    
    document.querySelectorAll('input[name="obligations"]').forEach(radio => {
        radio.addEventListener("change", updateConditionalRequirements);
    });
    
    document.querySelectorAll('input[name="microphone"]').forEach(radio => {
        radio.addEventListener("change", updateConditionalRequirements);
    });
	
	// Road Closure Permit BLS certification
    document.querySelectorAll('input[name="rcp_blsCertified"]').forEach(radio => {
        radio.addEventListener("change", updateBLSRequirement);
    });
}

// Function to show the custom modal
function showCustomModal(message, onConfirm, onCancel) {
    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");
    const confirmButton = document.getElementById("modalConfirm");
    const cancelButton = document.getElementById("modalCancel");

    modalMessage.textContent = message;

    modal.classList.remove("hidden");

    confirmButton.onclick = () => {
        modal.classList.add("hidden");
        if (onConfirm) onConfirm();
    };

    cancelButton.onclick = () => {
        modal.classList.add("hidden");
        if (onCancel) onCancel();
    };
}

// Function to add a new row for Character Name and Faction
function addFactionRow() {
    const factionContainer = document.getElementById("factionContainer");
    const newRow = document.createElement("div");
    newRow.classList.add("faction-row");

    newRow.innerHTML = `
        <input type="text" name="characterName[]" placeholder="Character Name">
        <input type="text" name="faction[]" placeholder="Faction">
    `;

    factionContainer.appendChild(newRow);
    onDynamicContentAdded();
}

// Function to remove the last row in the faction section
function removeFactionRow() {
    const factionContainer = document.getElementById('factionContainer');
    const rows = factionContainer.getElementsByClassName('faction-row');
    if (rows.length > 1) { // Ensure at least one row remains
        factionContainer.removeChild(rows[rows.length - 1]);
    } else {
        alert('You must have at least one faction row.');
    }
}

// Function to add a new Employment Section
function addEmploymentSection() {
    const employmentSection = document.getElementById("employmentSection");
    const newRow = document.createElement("div");
    newRow.classList.add("employmentContainer");

    newRow.innerHTML = `
        <label>Company Name:</label>
        <input type="text" name="companyName[]" placeholder="Enter company name">

        <label>Position:</label>
        <input type="text" name="position[]" placeholder="Enter position">

        <label>Direct Supervisor:</label>
        <input type="text" name="directSupervisor[]" placeholder="Enter direct supervisor">

        <label>Term of Employment:</label>
        <input type="text" name="termOfEmployment[]" placeholder="DD/MON/YYYY to DD/MON/YYYY">

        <label>Summary of Duties:</label>
        <textarea name="summaryOfDuties[]" rows="3" placeholder="Describe duties"></textarea>

        <label>Reason for Leaving:</label>
        <textarea name="reasonForLeaving[]" rows="3" placeholder="Reason for leaving"></textarea>
    `;

    employmentSection.appendChild(newRow);
    onDynamicContentAdded();
}

// Function to remove the last Employment Section
function removeEmploymentSection() {
    const employmentSection = document.getElementById("employmentSection");
    const rows = employmentSection.getElementsByClassName("employmentContainer");

    // Only allow removing if more than one row exists
    if (rows.length > 1) {
        employmentSection.removeChild(rows[rows.length - 1]);
    } else {
        alert('You must have at least one employment row.');
    }
}

// Function to toggle light/dark theme
function toggleTheme() {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    
    // Set the message based on the current theme
    const currentTheme = document.body.classList.contains('light-theme') ? 'Light' : 'Dark';
    modalMessage.textContent = `Are you sure you want to switch to ${currentTheme === 'Light' ? 'Dark' : 'Light'} theme?`;
    
    // Show the modal
    modal.classList.remove('hidden');

    // Add event listeners for confirm and cancel buttons
    document.getElementById('modalConfirm').onclick = function() {
        document.body.classList.toggle('light-theme');
        modal.classList.add('hidden');
    };

    document.getElementById('modalCancel').onclick = function() {
        modal.classList.add('hidden');
    };
}

// Function to toggle navigation visibility
function toggleNavigation() {
    const navigation = document.querySelector('.tab-navigation');
    const toggleIcon = document.querySelector('.nav-toggle-icon');
    
    if (navigation.classList.contains('collapsed')) {
        // Expand navigation
        navigation.classList.remove('collapsed');
        toggleIcon.textContent = '−';
        localStorage.setItem('navCollapsed', 'false');
    } else {
        // Collapse navigation
        navigation.classList.add('collapsed');
        toggleIcon.textContent = '+';
        localStorage.setItem('navCollapsed', 'true');
    }
}

// Function to restore navigation state on page load
function restoreNavigationState() {
    const navCollapsed = localStorage.getItem('navCollapsed') === 'true';
    const navigation = document.querySelector('.tab-navigation');
    const toggleIcon = document.querySelector('.nav-toggle-icon');
    
    if (navigation && toggleIcon) {
        navigation.classList.add('no-transition');
        
        if (navCollapsed) {
            navigation.classList.add('collapsed');
            toggleIcon.textContent = '+';
        }
        
        setTimeout(() => {
            navigation.classList.remove('no-transition');
        }, 100);
    }
}

// Scroll to Top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
function handleScrollToTopVisibility() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; // Show button after scrolling 300px
    
    if (window.pageYOffset > scrollThreshold) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Throttle function to improve scroll performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Throttled scroll handler
const throttledScrollHandler = throttle(handleScrollToTopVisibility, 100);

// Function to format date
function formatDate(inputDate) {
    if (!inputDate || inputDate === "DD/MMM/YYYY") {
        return "DD/MMM/YYYY";
    }

    // Parse the input date (assuming the input format is YYYY-MM-DD)
    const [year, month, day] = inputDate.split("-");

    // Create a new Date object
    const date = new Date(year, month - 1, day);

    // Define month names
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    // Format the date
    const formattedDate = `${String(day).padStart(2, "0")}/${monthNames[date.getMonth()]}/${year}`;

    return formattedDate;
}

// Clear form data
function clearData() {
    // Show confirmation popup
    showCustomModal("Are you sure you want to clear all data?", () => {
        // Clear all text inputs and textareas
        document.querySelectorAll("#main-application input[type='text'], #main-application textarea").forEach(el => el.value = "");
        
        // Clear date inputs except dateSigned
        document.querySelectorAll("#main-application input[type='date']").forEach(el => {
            if (el.id !== "dateSigned") {
                el.value = "";
            }
        });
        
        // Clear all checkboxes and radio buttons
        document.querySelectorAll("#main-application input[type='checkbox'], #main-application input[type='radio']").forEach(el => el.checked = false);
        
        // Remove all dynamically added Employment rows except the first
        const employmentSection = document.getElementById("employmentSection");
        if (employmentSection) {
            const rows = employmentSection.getElementsByClassName("employmentContainer");
            while (rows.length > 1) {
                employmentSection.removeChild(rows[rows.length - 1]);
            }
            // Clear the first row
            if (rows[0]) {
                rows[0].querySelectorAll("input, textarea").forEach(el => el.value = "");
            }
        }
        
        // Remove all dynamically added Faction rows except the first
        const factionContainer = document.getElementById("factionContainer");
        if (factionContainer) {
            const rows = factionContainer.getElementsByClassName("faction-row");
            while (rows.length > 1) {
                factionContainer.removeChild(rows[rows.length - 1]);
            }
            // Clear the first row
            if (rows[0]) {
                rows[0].querySelectorAll("input").forEach(el => el.value = "");
            }
        }
        
        // Hide the BBCode container
        document.getElementById("bbcodeContainer").classList.add("hidden");
        
        // Update conditional requirements
        updateConditionalRequirements();
        
        // Auto-save the cleared state
        autoSaveDraft();
        
        // Show confirmation
        const status = document.getElementById("autoSaveStatus");
        status.textContent = "Form cleared successfully.";
        status.classList.add("visible");
        setTimeout(() => status.classList.remove("visible"), 2000);
    });
}

// ===== VALIDATION FUNCTIONS START HERE =====

// Validation function for Main Application
function validateMainApplication() {
    const errors = {
        '👤 Personal Information': [],
        '💼 Employment & Availability': [],
        '🪪 Licenses & Criminal History': [],
        '❓ General Questions': [],
        '(( 🎮 Out-of-Character ))': [],
        '✍️ Declaration': []
    };
    
    // Section 1: Personal Information
    const section1Fields = [
        { id: 'fullName', name: 'Full Name (1.1)' },
        { id: 'dateOfBirth', name: 'Date of Birth (1.2)' },
        { id: 'phoneNumber', name: 'Phone Number (1.3)' },
        { id: 'proofOfIdentification', name: 'Proof of Identification (1.4)' }
    ];
    
    section1Fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Section 2: Employment & Availability
    // Check work shift availability (2.2)
    const workShifts = ['workShiftMorning', 'workShiftAfternoon', 'workShiftEvening', 'workShiftNight'];
    const anyShiftSelected = workShifts.some(id => document.getElementById(id).checked);
    if (!anyShiftSelected) {
        errors['💼 Employment & Availability'].push('Work Shift Availability (2.2) - at least one');
    }
    
    // Section 3: Licenses & Criminal History
    // Check radio buttons for licenses
    const section3RadioGroups = [
        { name: 'driverLicense', display: 'Driver\'s License (3.1)' },
        { name: 'firearmLicense', display: 'Firearm License (3.2)' }
    ];
    
    section3RadioGroups.forEach(group => {
        const checked = document.querySelector(`input[name="${group.name}"]:checked`);
        if (!checked) {
            errors['🪪 Licenses & Criminal History'].push(group.display);
        }
    });
    
    // Check conditional required fields for criminal record
    if ((document.getElementById('criminalMisdemeanors').checked || 
         document.getElementById('criminalFelonies').checked) && 
        !document.getElementById('criminalRecordDetails').value.trim()) {
        errors['🪪 Licenses & Criminal History'].push('Criminal Record Details (3.3.1) - required when misdemeanors/felonies are checked');
    }
    
    // Section 4: General Questions
    const section4Fields = [
        { id: 'whyJoin', name: 'Why do you wish to join (4.1)' },
        { id: 'whyGoodFit', name: 'Why would you be a good fit (4.2)' },
        { id: 'careerGoals', name: 'Career goals (4.3)' }
    ];
    
    section4Fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['❓ General Questions'].push(field.name);
        }
    });
    
    // Section 5: Out-of-Character
    const section5Fields = [
        { id: 'nickname', name: 'Name or Nickname (5.1)' },
        { id: 'age', name: 'Age (5.1)' },
        { id: 'countryTimeZone', name: 'Country and Time Zone (5.1)' },
        { id: 'discordName', name: 'Discord Name (5.1)' },
        { id: 'forumName', name: 'Forum Account Name (5.1)' },
        { id: 'forumLink', name: 'Forum Profile Link (5.1)' },
        { id: 'panelScreenshot', name: 'Admin Panel Screenshot (5.3)' }
    ];
    
    section5Fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['(( 🎮 Out-of-Character ))'].push(field.name);
        }
    });
    
    // Previous LSPD Employment (5.2)
    const lspdFactionChecked = document.querySelector('input[name="lspdFaction"]:checked');
    if (!lspdFactionChecked) {
        errors['(( 🎮 Out-of-Character ))'].push('Previous LSPD Employment (5.2)');
    }
    
    // LSPD reinstatement (5.2.1)
    const lspdYesRadio = document.querySelector('input[name="lspdFaction"][value="Yes"]');
    if (lspdYesRadio?.checked && !document.getElementById('reinstatementApp').value.trim()) {
        errors['(( 🎮 Out-of-Character ))'].push('Reinstatement Application Link (5.2.1)');
    }
    
    // Other Server Involvement (5.5)
    const factionServerChecked = document.querySelector('input[name="factionServer"]:checked');
    if (!factionServerChecked) {
        errors['(( 🎮 Out-of-Character ))'].push('Other Server Involvement (5.5)');
    }
    
    // Faction server explanation (5.5.1)
    const factionServerYes = document.querySelector('input[name="factionServer"][value="yesBut"]')?.checked || 
                            document.querySelector('input[name="factionServer"][value="yesAnd"]')?.checked;
    if (factionServerYes && !document.getElementById('factionServerExplanation').value.trim()) {
        errors['(( 🎮 Out-of-Character ))'].push('Other Server Involvement Explanation (5.5.1)');
    }
    
    // Upcoming Obligations (5.6)
    const obligationsChecked = document.querySelector('input[name="obligations"]:checked');
    if (!obligationsChecked) {
        errors['(( 🎮 Out-of-Character ))'].push('Upcoming Obligations (5.6)');
    }
    
    // Obligations explanation (5.6.1)
    if (document.querySelector('input[name="obligations"][value="Yes"]')?.checked && 
        !document.getElementById('availabilityExplanation').value.trim()) {
        errors['(( 🎮 Out-of-Character ))'].push('Availability Explanation (5.6.1)');
    }
    
    // Microphone and TeamSpeak (5.7)
    const microphoneChecked = document.querySelector('input[name="microphone"]:checked');
    if (!microphoneChecked) {
        errors['(( 🎮 Out-of-Character ))'].push('Microphone and TeamSpeak (5.7)');
    }
    
    // Microphone explanation (5.7.1)
    if (document.querySelector('input[name="microphone"][value="No"]')?.checked && 
        !document.getElementById('microphoneExplanation').value.trim()) {
        errors['(( 🎮 Out-of-Character ))'].push('Microphone/TeamSpeak Explanation (5.7.1)');
    }
    
    // Section 6: Declaration
    const section6Fields = [
        { id: 'signature', name: 'Signature (6.1)' },
        { id: 'dateSigned', name: 'Date Signed (6.2)' }
    ];
    
    section6Fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validation functions for other forms
function validateStandardFirearm() {
    const errors = {
        '👤 Personal Information': [],
        '🔫 Firearm Details': [],
        '✍️ Declaration': [],
        '(( 🎮 Out-of-Character ))': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 'sf_fullName', name: 'Full Name (A1)' },
        { id: 'sf_dateOfBirth', name: 'Date of Birth (A2)' },
        { id: 'sf_phoneNumber', name: 'Phone Number (A3)' },
        { id: 'sf_residenceAddress', name: 'Residence Address (A4)' },
        { id: 'sf_driversLicense', name: 'Driver\'s License (A5)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Firearm Details
    const firearmFields = [
        { id: 'sf_whyFirearm', name: 'Why do you wish to own a firearm (B1)' },
        { id: 'sf_storage', name: 'Storage plans (B3)' }
    ];
    
    firearmFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['🔫 Firearm Details'].push(field.name);
        }
    });
    
    // Check if at least one firearm is selected
    const firearms = ['sf_doubleAction', 'sf_heavyRevolver', 'sf_heavyRevolverMk2', 'sf_navyRevolver', 
                     'sf_pistol', 'sf_pistolMk2', 'sf_pistol50', 'sf_heavyPistol', 'sf_combatPistol', 
                     'sf_snsPistol', 'sf_snsPistolMk2', 'sf_vintagePistol', 'sf_wm29Pistol', 'sf_flareGun'];
    const selectedCount = firearms.filter(id => document.getElementById(id).checked).length;
    
    if (selectedCount === 0) {
        errors['🔫 Firearm Details'].push('At least one firearm selection (B2)');
    } else if (selectedCount > 2) {
        errors['🔫 Firearm Details'].push('Maximum 2 firearms can be selected (B2)');
    }
    
    // Declaration
    const declarationFields = [
        { id: 'sf_signature', name: 'Signature (C1)' },
        { id: 'sf_dateSigned', name: 'Date Signed (C2)' }
    ];
    
    declarationFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // OOC
    const oocFields = [
        { id: 'sf_panelScreenshot', name: 'Admin Panel Screenshot (D1)' },
        { id: 'sf_understand', name: 'Understanding of rules (D2)' }
    ];
    
    oocFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['(( 🎮 Out-of-Character ))'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validatePriorsFirearm() {
    const errors = {
        '👤 Personal Information': [],
        '📋 Criminal Record': [],
        '🔫 Firearm Details': [],
        '✍️ Declaration': [],
        '(( 🎮 Out-of-Character ))': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 'pf_fullName', name: 'Full Name (A1)' },
        { id: 'pf_dateOfBirth', name: 'Date of Birth (A2)' },
        { id: 'pf_phoneNumber', name: 'Phone Number (A3)' },
        { id: 'pf_residenceAddress', name: 'Residence Address (A4)' },
        { id: 'pf_driversLicense', name: 'Driver\'s License (A5)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Criminal Record
    const criminalFields = [
        { id: 'pf_levelFour', name: 'Level Four charges status (A6)' },
        { id: 'pf_levelThree', name: 'Level Three charges status (A7)' },
        { id: 'pf_levelTwo', name: 'Level Two charges status (A8)' },
        { id: 'pf_levelOne', name: 'Level One charges status (A9)' },
        { id: 'pf_revoked', name: 'Revocation status (A10)' }
    ];
    
    criminalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Criminal Record'].push(field.name);
        }
    });
    
    // Firearm Details
    const firearmFields = [
        { id: 'pf_whyFirearm', name: 'Why do you wish to own a firearm (B1)' },
        { id: 'pf_storage', name: 'Storage plans (B3)' }
    ];
    
    firearmFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['🔫 Firearm Details'].push(field.name);
        }
    });
    
    // Check firearms
    const firearms = ['pf_doubleAction', 'pf_heavyRevolver', 'pf_heavyRevolverMk2', 'pf_navyRevolver', 
                     'pf_pistol', 'pf_pistolMk2', 'pf_pistol50', 'pf_heavyPistol', 'pf_combatPistol', 
                     'pf_snsPistol', 'pf_snsPistolMk2', 'pf_vintagePistol', 'pf_wm29Pistol', 'pf_flareGun'];
    const selectedCount = firearms.filter(id => document.getElementById(id).checked).length;
    
    if (selectedCount === 0) {
        errors['🔫 Firearm Details'].push('At least one firearm selection (B2)');
    } else if (selectedCount > 2) {
        errors['🔫 Firearm Details'].push('Maximum 2 firearms can be selected (B2)');
    }
    
    // Declaration
    const declarationFields = [
        { id: 'pf_signature', name: 'Signature (C1)' },
        { id: 'pf_dateSigned', name: 'Date Signed (C2)' }
    ];
    
    declarationFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // OOC
    const oocFields = [
        { id: 'pf_panelScreenshot', name: 'Admin Panel Screenshot (D1)' },
        { id: 'pf_understand', name: 'Understanding of rules (D2)' }
    ];
    
    oocFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['(( 🎮 Out-of-Character ))'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateShotgunLicense() {
    const errors = {
        '👤 Personal Information': [],
        '🔫 Shotgun Details': [],
        '✍️ Declaration': [],
        '💳 Payment': [],
        '(( 🎮 Out-of-Character ))': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 'sl_fullName', name: 'Full Name (A1)' },
        { id: 'sl_dateOfBirth', name: 'Date of Birth (A2)' },
        { id: 'sl_phoneNumber', name: 'Phone Number (A3)' },
        { id: 'sl_residenceAddress', name: 'Residence Address (A4)' },
        { id: 'sl_driversLicense', name: 'Driver\'s License (A5)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Shotgun Details
    const shotgunFields = [
        { id: 'sl_whyShotgun', name: 'Why do you wish to own a shotgun (B1)' },
        { id: 'sl_storage', name: 'Storage plans (B3)' }
    ];
    
    shotgunFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['🔫 Shotgun Details'].push(field.name);
        }
    });
    
    // Check shotgun selection
    const shotgunSelected = document.querySelector('input[name="sl_shotgunType"]:checked');
    if (!shotgunSelected) {
        errors['🔫 Shotgun Details'].push('Shotgun type selection (B2)');
    }
    
    // Declaration
    const declarationFields = [
        { id: 'sl_signature', name: 'Signature (C1)' },
        { id: 'sl_dateSigned', name: 'Date Signed (C2)' }
    ];
    
    declarationFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // Payment
    const paymentReceipt = document.getElementById('sl_paymentReceipt');
    if (!paymentReceipt || !paymentReceipt.value.trim()) {
        errors['💳 Payment'].push('Payment Receipt (D1)');
    }
    
    // OOC
    const oocFields = [
        { id: 'sl_panelScreenshot', name: 'Admin Panel Screenshot (E1)' },
        { id: 'sl_understand', name: 'Understanding of rules (E2)' }
    ];
    
    oocFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['(( 🎮 Out-of-Character ))'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateFirearmChange() {
    const errors = {
        '👤 Requestee Details': [],
        '🔫 Firearm Selection': [],
        '💳 Payment': [],
        '✍️ Declaration': []
    };
    
    // Requestee Details
    const personalFields = [
        { id: 'fc_fullName', name: 'Full Name' },
        { id: 'fc_phoneNumber', name: 'Phone Number' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Requestee Details'].push(field.name);
        }
    });
    
    // Check current firearms
    const currentFirearms = ['fc_current_doubleAction', 'fc_current_heavyRevolver', 'fc_current_heavyRevolverMk2', 
                            'fc_current_navyRevolver', 'fc_current_pistol', 'fc_current_pistolMk2', 
                            'fc_current_pistol50', 'fc_current_heavyPistol', 'fc_current_combatPistol', 
                            'fc_current_snsPistol', 'fc_current_snsPistolMk2', 'fc_current_vintagePistol', 
                            'fc_current_wm29Pistol', 'fc_current_flareGun'];
    const currentSelected = currentFirearms.filter(id => document.getElementById(id).checked).length;
    
    if (currentSelected === 0) {
        errors['🔫 Firearm Selection'].push('At least one current firearm must be selected');
    }
    
    // Check wished firearms
    const wishedFirearms = ['fc_wish_doubleAction', 'fc_wish_heavyRevolver', 'fc_wish_heavyRevolverMk2', 
                           'fc_wish_navyRevolver', 'fc_wish_pistol', 'fc_wish_pistolMk2', 
                           'fc_wish_pistol50', 'fc_wish_heavyPistol', 'fc_wish_combatPistol', 
                           'fc_wish_snsPistol', 'fc_wish_snsPistolMk2', 'fc_wish_vintagePistol', 
                           'fc_wish_wm29Pistol', 'fc_wish_flareGun'];
    const wishedSelected = wishedFirearms.filter(id => document.getElementById(id).checked).length;
    
    if (wishedSelected === 0) {
        errors['🔫 Firearm Selection'].push('At least one wished firearm must be selected');
    }
    
    // Payment
    const paymentProof = document.getElementById('fc_paymentProof');
    if (!paymentProof || !paymentProof.value.trim()) {
        errors['💳 Payment'].push('Payment Proof');
    }
    
    // Declaration
    const declarationFields = [
        { id: 'fc_signature', name: 'Signature' },
        { id: 'fc_dateSigned', name: 'Date Signed' }
    ];
    
    declarationFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateFirearmSubmission() {
    const errors = {
        '👤 Requestee Details': [],
        '🔫 Firearm Details': []
    };
    
    const requiredFields = [
        { id: 'fs_fullName', name: 'Full Name', section: '👤 Requestee Details' },
        { id: 'fs_phoneNumber', name: 'Phone Number', section: '👤 Requestee Details' },
        { id: 'fs_firearms', name: 'Firearms to turn in', section: '🔫 Firearm Details' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors[field.section].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateMissingFirearm() {
    const errors = {
        '👤 Requestee Details': [],
        '🔫 Missing Firearm Details': [],
        '💳 Payment': [],
        '✍️ Declaration': []
    };
    
    // Requestee Details
    const personalFields = [
        { id: 'mf_fullName', name: 'Full Name' },
        { id: 'mf_phoneNumber', name: 'Phone Number' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Requestee Details'].push(field.name);
        }
    });
    
    // Missing Firearm Details
    const firearmFields = [
        { id: 'mf_missingFirearms', name: 'Missing firearms' },
        { id: 'mf_status', name: 'Status (Lost or Stolen)' },
        { id: 'mf_serialDetails', name: 'Serial number or purchase details' },
        { id: 'mf_lossDetails', name: 'Loss details' },
        { id: 'mf_deathLoss', name: 'Character death information' }
    ];
    
    firearmFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['🔫 Missing Firearm Details'].push(field.name);
        }
    });
    
    // Payment
    const paymentProof = document.getElementById('mf_paymentProof');
    if (!paymentProof || !paymentProof.value.trim()) {
        errors['💳 Payment'].push('Payment proof');
    }
    
    // Declaration
    const declarationFields = [
        { id: 'mf_dateSigned', name: 'Date' },
        { id: 'mf_signature', name: 'Signature' }
    ];
    
    declarationFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateGuardCard() {
    const errors = {
        '👤 Personal & Business Info': [],
        '🔫 Weapon Selection': [],
        '✍️ Declaration': [],
        '💳 Payment': []
    };
    
    // Personal & Business Info
    const infoFields = [
        { id: 'gc_fullName', name: 'Full Name (A1)' },
        { id: 'gc_dateOfBirth', name: 'Date of Birth (A2)' },
        { id: 'gc_phoneNumber', name: 'Phone Number (A3)' },
        { id: 'gc_residenceAddress', name: 'Residence Address (A4)' },
        { id: 'gc_businessName', name: 'Business Name (A5)' },
        { id: 'gc_businessLicense', name: 'Business License Link (A6)' },
        { id: 'gc_firearmsLicense', name: 'Firearms License (A7)' }
    ];
    
    infoFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal & Business Info'].push(field.name);
        }
    });
    
    // Weapon Selection
    const whyGuardCard = document.getElementById('gc_whyGuardCard');
    if (!whyGuardCard || !whyGuardCard.value.trim()) {
        errors['🔫 Weapon Selection'].push('Why do you wish to own a Guard Card (B1)');
    }
    
    // Check pistol selection
    const pistolSelected = document.querySelector('input[name="gc_pistolType"]:checked');
    if (!pistolSelected) {
        errors['🔫 Weapon Selection'].push('Pistol type selection (B2)');
    }
    
    // Declaration
    const declarationFields = [
        { id: 'gc_signature', name: 'Signature (C1)' },
        { id: 'gc_dateSigned', name: 'Date Signed (C2)' }
    ];
    
    declarationFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Declaration'].push(field.name);
        }
    });
    
    // Payment
    const paymentReceipt = document.getElementById('gc_paymentReceipt');
    if (!paymentReceipt || !paymentReceipt.value.trim()) {
        errors['💳 Payment'].push('Payment Receipt');
    }
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateReinstatement() {
    const errors = {
        '👤 Personal Information': [],
        '📋 Employment History': [],
        '❓ General Information': [],
        '💼 Employment During Absence': [],
        '(( 🎮 Out-of-Character ))': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 're_firstName', name: 'First Name (1.1)' },
        { id: 're_lastName', name: 'Last Name (1.1)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Employment History
    const employmentFields = [
        { id: 're_formerRank', name: 'Former Rank (2.1)' },
        { id: 're_endDate', name: 'Employment End Date (2.1)' },
        { id: 're_reason', name: 'Reason (2.1)' },
        { id: 're_desiredRank', name: 'Desired Rank (2.1)' },
        { id: 're_desiredAssignment', name: 'Desired Assignment (2.1)' }
    ];
    
    employmentFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Employment History'].push(field.name);
        }
    });
    
    // General Information
    const generalFields = [
        { id: 're_whatDone', name: 'What have you done since (3.1)' },
        { id: 're_resignationReason', name: 'Resignation reason (3.1)' }
    ];
    
    generalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['❓ General Information'].push(field.name);
        }
    });
    
    // Employment During Absence
    const absenceFields = [
        { id: 're_company', name: 'Company (4.1)' },
        { id: 're_position', name: 'Position (4.1)' },
        { id: 're_employmentEndDate', name: 'Employment End Date (4.1)' },
        { id: 're_employmentReason', name: 'Employment Reason (4.1)' }
    ];
    
    absenceFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['💼 Employment During Absence'].push(field.name);
        }
    });
    
    // OOC
    const oocFields = [
        { id: 're_oocDone', name: 'OOC activities (5.1)' },
        { id: 're_panelScreenshot', name: 'Panel Screenshot (5.1)' }
    ];
    
    oocFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['(( 🎮 Out-of-Character ))'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateTransfer() {
    const errors = {
        '👤 Personal Information': [],
        '📋 Department Employment': [],
        '❓ General Questions': [],
        '(( 🎮 Out-of-Character ))': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 'tr_firstName', name: 'First Name (1.1)' },
        { id: 'tr_lastName', name: 'Last Name (1.1)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Department Employment
    const employmentFields = [
        { id: 'tr_currentRank', name: 'Current Rank (2.1)' },
        { id: 'tr_currentAssignment', name: 'Current Assignment (2.1)' },
        { id: 'tr_desiredRank', name: 'Desired Rank (2.2)' },
        { id: 'tr_desiredAssignment', name: 'Desired Assignment (2.2)' }
    ];
    
    employmentFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Department Employment'].push(field.name);
        }
    });
    
    // General Questions
    const generalFields = [
        { id: 'tr_whyTransfer', name: 'Why transfer (3.1)' },
        { id: 'tr_whatAchieve', name: 'What to achieve (3.1)' },
        { id: 'tr_supervisoryTraining', name: 'Supervisory training (3.1)' },
        { id: 'tr_disciplinaryAction', name: 'Disciplinary action (3.1)' }
    ];
    
    generalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['❓ General Questions'].push(field.name);
        }
    });
    
    // OOC
    const panelScreenshot = document.getElementById('tr_panelScreenshot');
    if (!panelScreenshot || !panelScreenshot.value.trim()) {
        errors['(( 🎮 Out-of-Character ))'].push('Panel Screenshot (4.1)');
    }
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateComplaint() {
    const errors = {
        '👤 Your Information': [],
        '📋 Incident Details': []
    };
    
    // Your Information
    const yourInfoFields = [
        { id: 'co_fullName', name: 'Your Full Name' },
        { id: 'co_phone', name: 'Your Phone' },
        { id: 'co_address', name: 'Your Address' }
    ];
    
    yourInfoFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Your Information'].push(field.name);
        }
    });
    
    // Incident Details
    const incidentFields = [
        { id: 'co_incidentDate', name: 'Incident Date' },
        { id: 'co_incidentTime', name: 'Incident Time' },
        { id: 'co_incidentLocation', name: 'Incident Location' },
        { id: 'co_incidentDescription', name: 'Incident Description' }
    ];
    
    incidentFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Incident Details'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

function validateCommendation() {
    const errors = {
        '👤 Your Information': [],
        '📋 Incident Details': []
    };
    
    // Your Information
    const yourInfoFields = [
        { id: 'cm_fullName', name: 'Your Full Name' },
        { id: 'cm_phone', name: 'Your Phone' },
        { id: 'cm_address', name: 'Your Address' }
    ];
    
    yourInfoFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Your Information'].push(field.name);
        }
    });
    
    // Incident Details
    const incidentFields = [
        { id: 'cm_incidentDate', name: 'Incident Date' },
        { id: 'cm_incidentTime', name: 'Incident Time' },
        { id: 'cm_incidentLocation', name: 'Incident Location' },
        { id: 'cm_description', name: 'Commendation Description' }
    ];
    
    incidentFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Incident Details'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Roleplay Feedback
function validateRoleplayFeedback() {
    const errors = {
        '📋 Feedback Information': []
    };
    
    const requiredFields = [
        { id: 'rf_playerName', name: 'Player name (1)' },
        { id: 'rf_lspdMembers', name: 'LSPD members (2)' },
        { id: 'rf_dateTime', name: 'Date and time (3)' },
        { id: 'rf_description', name: 'Event description (6)' },
        { id: 'rf_differently', name: 'What would do differently (7)' },
        { id: 'rf_accomplish', name: 'What hoping to accomplish (8)' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Feedback Information'].push(field.name);
        }
    });
    
    // Check LSPD points (at least 3)
    const lspdPoints = document.getElementsByName('rf_lspdPoints[]');
    let lspdFilled = 0;
    for (let i = 0; i < lspdPoints.length; i++) {
        if (lspdPoints[i].value.trim()) lspdFilled++;
    }
    if (lspdFilled < 3) {
        errors['📋 Feedback Information'].push('At least 3 LSPD points (4)');
    }
    
    // Check player points (at least 3)
    const playerPoints = document.getElementsByName('rf_playerPoints[]');
    let playerFilled = 0;
    for (let i = 0; i < playerPoints.length; i++) {
        if (playerPoints[i].value.trim()) playerFilled++;
    }
    if (playerFilled < 3) {
        errors['📋 Feedback Information'].push('At least 3 player points (5)');
    }
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Press Inquiries
function validatePressInquiries() {
    const errors = {
        '📋 Contact Information': [],
        '📝 Request Information': []
    };
    
    const contactFields = [
        { id: 'pi_fullName', name: 'Full Name' },
        { id: 'pi_phoneNumber', name: 'Phone Number' },
        { id: 'pi_email', name: 'E-Mail Address' },
        { id: 'pi_position', name: 'Position in Agency' }
    ];
    
    contactFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Contact Information'].push(field.name);
        }
    });
    
    const requestDetails = document.getElementById('pi_requestDetails');
    if (!requestDetails || !requestDetails.value.trim()) {
        errors['📝 Request Information'].push('Request details');
    }
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Public Inquiries
function validatePublicInquiries() {
    const errors = {
        '📋 Contact Information': [],
        '📝 Request Information': []
    };
    
    const contactFields = [
        { id: 'pui_fullName', name: 'Full Name' },
        { id: 'pui_phoneNumber', name: 'Phone Number' },
        { id: 'pui_email', name: 'E-Mail Address' }
    ];
    
    contactFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Contact Information'].push(field.name);
        }
    });
    
    const requestDetails = document.getElementById('pui_requestDetails');
    if (!requestDetails || !requestDetails.value.trim()) {
        errors['📝 Request Information'].push('Request details');
    }
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Press Passes
function validatePressPasses() {
    const errors = {
        '👤 Personal Details': [],
        '💼 Employment Details': [],
        '📎 Form Attachments': [],
        '✍️ Agreement': []
    };
    
    // Personal Details
    const personalFields = [
        { id: 'pp_fullName', name: 'Full Name (1.1)' },
        { id: 'pp_dateOfBirth', name: 'Date of Birth (1.2)' },
        { id: 'pp_phoneNumber', name: 'Phone Number (1.3)' },
        { id: 'pp_residentialAddress', name: 'Residential Address (1.4)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Details'].push(field.name);
        }
    });
    
    // Employment Details
    const employmentFields = [
        { id: 'pp_employer', name: 'Employer (2.1)' },
        { id: 'pp_position', name: 'Position/Job Title (2.2)' },
        { id: 'pp_businessAddress', name: 'Business Address (2.3)' },
        { id: 'pp_jobDuties', name: 'Job Duties Description (2.4)' }
    ];
    
    employmentFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['💼 Employment Details'].push(field.name);
        }
    });
    
    // Form Attachments
    const attachmentFields = [
        { id: 'pp_passportPhoto', name: 'Passport Photograph (3.1)' },
        { id: 'pp_proofOfId', name: 'Proof of Identification (3.2)' },
        { id: 'pp_proofOfEmployment', name: 'Proof of Employment (3.3)' },
        { id: 'pp_letterhead', name: 'Business Letterhead (3.4)' }
    ];
    
    attachmentFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📎 Form Attachments'].push(field.name);
        }
    });
    
    // Agreement
    const agreementFields = [
        { id: 'pp_signature', name: 'Signature (4.1)' },
        { id: 'pp_dateSigned', name: 'Date Signed (4.2)' }
    ];
    
    agreementFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Agreement'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Self Background Check
function validateSelfBackgroundCheck() {
    const errors = {
        '👤 Personal Information': [],
        '📋 Request Options': [],
        '✍️ Acknowledgement': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 'sbc_fullName', name: 'Full Name (A.1)' },
        { id: 'sbc_phoneNumber', name: 'Phone Number (A.2)' },
        { id: 'sbc_govLicense', name: 'Gov. License (A.3)' },
        { id: 'sbc_passportPhoto', name: 'Passport Photo (A.4)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Request Options
    const timeframeSelected = document.querySelector('input[name="sbc_timeframe"]:checked');
    if (!timeframeSelected) {
        errors['📋 Request Options'].push('Timeframe selection (B.1)');
    }
    
    // Check if at least one offense type is selected
    const citations = document.getElementById('sbc_citations').checked;
    const misdemeanors = document.getElementById('sbc_misdemeanors').checked;
    const felonies = document.getElementById('sbc_felonies').checked;
    
    if (!citations && !misdemeanors && !felonies) {
        errors['📋 Request Options'].push('At least one offense type (B.2)');
    }
    
    // Acknowledgement
    const acknowledgementFields = [
        { id: 'sbc_signature', name: 'Signature (C1)' },
        { id: 'sbc_dateSigned', name: 'Date Signed (C2)' }
    ];
    
    acknowledgementFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Acknowledgement'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Company/Department Background Check
function validateCompanyBackgroundCheck() {
    const errors = {
        '👤 Personal Information': [],
        '📋 Request Options': [],
        '✍️ Acknowledgement': []
    };
    
    // Personal Information
    const personalFields = [
        { id: 'cbc_fullName', name: 'Full Name (A.1)' },
        { id: 'cbc_phoneNumber', name: 'Phone Number (A.2)' },
        { id: 'cbc_govLicense', name: 'Gov. License (A.3)' },
        { id: 'cbc_hrBadge', name: 'HR Badge (A.4)' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Personal Information'].push(field.name);
        }
    });
    
    // Request Options
    const timeframeSelected = document.querySelector('input[name="cbc_timeframe"]:checked');
    if (!timeframeSelected) {
        errors['📋 Request Options'].push('Timeframe selection (B.1)');
    }
    
    // Check if at least one offense type is selected
    const citations = document.getElementById('cbc_citations').checked;
    const misdemeanors = document.getElementById('cbc_misdemeanors').checked;
    const felonies = document.getElementById('cbc_felonies').checked;
    
    if (!citations && !misdemeanors && !felonies) {
        errors['📋 Request Options'].push('At least one offense type (B.2)');
    }
    
    // Acknowledgement
    const acknowledgementFields = [
        { id: 'cbc_signature', name: 'Signature (C1)' },
        { id: 'cbc_dateSigned', name: 'Date Signed (C2)' }
    ];
    
    acknowledgementFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Acknowledgement'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Report a Crime
function validateReportCrime() {
    const errors = {
        '📋 Incident Information': []
    };
    
    const requiredFields = [
        { id: 'rc_yourName', name: 'Your Name' },
        { id: 'rc_yourPhone', name: 'Your Phone' },
        { id: 'rc_dateOfIncident', name: 'Date of Incident' },
        { id: 'rc_locationOfIncident', name: 'Location of Incident' },
        { id: 'rc_description', name: 'Description of Incident' }
    ];
    
    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📋 Incident Information'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Bounty Report
function validateBountyReport() {
    const errors = {
        '👤 Your Information': [],
        '🏠 Stash House Information': [],
        '✍️ Disclaimer': []
    };
    
    // Your Information
    const personalFields = [
        { id: 'br_fullName', name: 'Full Name' },
        { id: 'br_phone', name: 'Phone' },
        { id: 'br_address', name: 'Address' }
    ];
    
    personalFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Your Information'].push(field.name);
        }
    });
    
    // Stash House Information
    // Check if at least one property is filled
    const properties = document.getElementsByName('br_property[]');
    let hasProperty = false;
    for (let i = 0; i < properties.length; i++) {
        if (properties[i].value.trim()) {
            hasProperty = true;
            break;
        }
    }
    if (!hasProperty) {
        errors['🏠 Stash House Information'].push('At least one property location');
    }
    
    const stashDescription = document.getElementById('br_stashDescription');
    if (!stashDescription || !stashDescription.value.trim()) {
        errors['🏠 Stash House Information'].push('Stash house description');
    }
    
    // Disclaimer
    const disclaimerFields = [
        { id: 'br_signature', name: 'Signature' },
        { id: 'br_dateSigned', name: 'Date Signed' }
    ];
    
    disclaimerFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Disclaimer'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Road Closure Permit
function validateRoadClosurePermit() {
    const errors = {
        '👤 Requestee Details': [],
        '📅 Event Details': [],
        '✍️ Agreement': []
    };
    
    // Requestee Details
    const requesteeFields = [
        { id: 'rcp_fullName', name: 'Full Name (1.1)' },
        { id: 'rcp_dateOfBirth', name: 'Date of Birth (1.2)' },
        { id: 'rcp_phoneNumber', name: 'Phone Number (1.3)' },
        { id: 'rcp_driversLicense', name: 'Driver\'s License (1.5)' }
    ];
    
    requesteeFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Requestee Details'].push(field.name);
        }
    });
    
    // Event Details
    const eventFields = [
        { id: 'rcp_eventLocation', name: 'Event Location (2.1)' },
        { id: 'rcp_eventDate', name: 'Event Date (2.2)' },
        { id: 'rcp_startTime', name: 'Start Time (2.3)' },
        { id: 'rcp_finishTime', name: 'Finish Time (2.4)' },
        { id: 'rcp_participants', name: 'Number of Participants (2.5)' },
        { id: 'rcp_eventDetails', name: 'Event Details (2.6)' }
    ];
    
    eventFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['📅 Event Details'].push(field.name);
        }
    });
    
    // Check BLS certification
    const blsSelected = document.querySelector('input[name="rcp_blsCertified"]:checked');
    if (!blsSelected) {
        errors['📅 Event Details'].push('BLS Certification Question (2.7)');
    }
	
	// Check if BLS individuals are provided when Yes is selected
    const blsYes = document.querySelector('input[name="rcp_blsCertified"][value="yes"]')?.checked;
    if (blsYes) {
        const blsIndividuals = document.getElementById('rcp_blsIndividuals');
    if (!blsIndividuals || !blsIndividuals.value.trim()) {
        errors['📅 Event Details'].push('BLS Certified Individuals (2.7)');
        }
    }
    
    // Agreement
    const agreementFields = [
        { id: 'rcp_signature', name: 'Signature (3.1)' },
        { id: 'rcp_dateSigned', name: 'Date Signed (3.2)' }
    ];
    
    agreementFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Agreement'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Validate Ride-Along Program
function validateRideAlong() {
    const errors = {
        '👤 Requestee Details': [],
        '📝 Request Details': [],
        '✍️ Release & Waiver': []
    };
    
    // Requestee Details
    const requesteeFields = [
        { id: 'ra_fullName', name: 'Full Name (1.1)' },
        { id: 'ra_dateOfBirth', name: 'Date of Birth (1.2)' },
        { id: 'ra_phoneNumber', name: 'Phone Number (1.3)' },
        { id: 'ra_convicted', name: 'Criminal Conviction Status (1.4)' }
    ];
    
    requesteeFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['👤 Requestee Details'].push(field.name);
        }
    });
    
    // Request Details
    const why = document.getElementById('ra_why');
    if (!why || !why.value.trim()) {
        errors['📝 Request Details'].push('Reason for Ride-Along (2.1)');
    }
    
    // Release & Waiver
    const waiverFields = [
        { id: 'ra_signature', name: 'Signature (3.1)' },
        { id: 'ra_dateSigned', name: 'Date Signed (3.2)' }
    ];
    
    waiverFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            errors['✍️ Release & Waiver'].push(field.name);
        }
    });
    
    // Remove empty sections
    Object.keys(errors).forEach(section => {
        if (errors[section].length === 0) {
            delete errors[section];
        }
    });
    
    return errors;
}

// Add this function to format validation errors nicely
function formatValidationErrors(errors) {
    if (!errors || (Array.isArray(errors) && errors.length === 0) || (typeof errors === 'object' && Object.keys(errors).length === 0)) {
        return null;
    }
    
    let html = '<div style="text-align: left; max-height: 400px; overflow-y: auto; padding: 10px;">';
    html += '<h3 style="color: #ef4444; margin-bottom: 16px; text-align: center;">⚠️ Missing Required Fields</h3>';
    
    // If errors is an array (simple format)
    if (Array.isArray(errors)) {
        html += '<p style="margin-bottom: 12px;">Please fill in all required fields:</p>';
        html += '<ul style="list-style: none; padding: 0;">';
        errors.forEach(error => {
            html += `<li style="margin-bottom: 8px; padding-left: 20px;">• ${error}</li>`;
        });
        html += '</ul>';
    } 
    // If errors is an object (sectioned format)
    else if (typeof errors === 'object') {
        html += '<p style="margin-bottom: 16px; font-size: 14px; color: #737373;">Please complete all sections before submitting:</p>';
        
        Object.keys(errors).forEach(section => {
            if (errors[section].length > 0) {
                html += `<div style="margin-bottom: 20px;">`;
                html += `<h4 style="color: #4f46e5; margin-bottom: 8px; font-size: 16px;">${section}</h4>`;
                html += '<ul style="list-style: none; padding: 0; margin-left: 16px;">';
                errors[section].forEach(field => {
                    html += `<li style="margin-bottom: 6px; font-size: 14px;">• ${field}</li>`;
                });
                html += '</ul>';
                html += '</div>';
            }
        });
    }
    
    html += '</div>';
    return html;
}

// Update the showCustomModal function to properly detect validation errors
function showCustomModal(message, onConfirm, onCancel) {
    const modal = document.getElementById("customModal");
    const modalMessage = document.getElementById("modalMessage");
    const confirmButton = document.getElementById("modalConfirm");
    const cancelButton = document.getElementById("modalCancel");

    // Check if this is a validation error (HTML content with specific structure)
    const isValidationError = message && typeof message === 'string' && 
                             message.includes('Missing Required Fields') && 
                             message.includes('<div');

    if (isValidationError) {
        modalMessage.innerHTML = message; // Use innerHTML for validation errors
        confirmButton.style.display = 'none';
        cancelButton.textContent = 'OK';
        cancelButton.className = 'btn-ok'; // Use neutral color for OK button
    } else {
        modalMessage.textContent = message; // Use textContent for regular messages
        confirmButton.style.display = 'inline-block';
        confirmButton.textContent = 'Yes';  // Reset to Yes
        cancelButton.textContent = 'No';   // Reset to No
        cancelButton.className = 'btn-cancel'; // Reset to cancel styling
    }

    modal.classList.remove("hidden");

    confirmButton.onclick = () => {
        modal.classList.add("hidden");
        if (onConfirm) onConfirm();
    };

    cancelButton.onclick = () => {
        modal.classList.add("hidden");
        if (!isValidationError && onCancel) {
            onCancel();
        }
    };
}

// ===== END OF VALIDATION FUNCTIONS =====

// Generate BBCode output
function generateBBCode() {
    // Validate first
    const errors = validateMainApplication();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    // Get all form values
    const fullName = document.getElementById("fullName").value || "YOUR NAME HERE";
    const dateOfBirth = formatDate(document.getElementById("dateOfBirth").value) || "DD/MMM/YYYY";
    const phoneNumber = document.getElementById("phoneNumber").value || "NUMBER";
    const proofOfIdentification = document.getElementById("proofOfIdentification").value || "ADD DIRECT IMAGE LINK TO YOUR SCREENSHOT REPLACING THIS TEXT IN CAPS ONLY";

    // Collect all employment-related fields
    const companyNames = document.getElementsByName("companyName[]");
    const positions = document.getElementsByName("position[]");
    const directSupervisors = document.getElementsByName("directSupervisor[]");
    const termsOfEmployment = document.getElementsByName("termOfEmployment[]");
    const summariesOfDuties = document.getElementsByName("summaryOfDuties[]");
    const reasonsForLeaving = document.getElementsByName("reasonForLeaving[]");

    let combinedResults = "";

    // Loop through the employment fields by index
    for (let i = 0; i < companyNames.length; i++) {
        const companyName = companyNames[i].value || "N/A";
        const position = positions[i].value || "N/A";
        const directSupervisor = directSupervisors[i].value || "N/A";
        const termOfEmployment = termsOfEmployment[i].value || "N/A";
        const summaryOfDuties = summariesOfDuties[i].value || "N/A";
        const reasonForLeaving = reasonsForLeaving[i].value || "N/A";

        // Format the data as a string
        const formattedString = `[LIST=NONE]
[b]Company Name[/b]: ${companyName}
[b]Position[/b]: ${position}
[b]Direct Supervisor[/b]: ${directSupervisor}
[b]Term of Employment[/b]: ${termOfEmployment}
[b]Summary of Duties[/b]: ${summaryOfDuties}
[b]Reason for Leaving[/b]: ${reasonForLeaving}
[/LIST]`;

        combinedResults += formattedString;
    }

    const workShiftMorning = document.getElementById("workShiftMorning").checked ? "[cbc]" : "[cb]";
    const workShiftAfternoon = document.getElementById("workShiftAfternoon").checked ? "[cbc]" : "[cb]";
    const workShiftEvening = document.getElementById("workShiftEvening").checked ? "[cbc]" : "[cb]";
    const workShiftNight = document.getElementById("workShiftNight").checked ? "[cbc]" : "[cb]";

    // Driver's License and Firearm License radio buttons
    const driverLicenseYes = document.querySelector("input[name='driverLicense'][value='Yes']").checked ? "[cbc]" : "[cb]";
    const driverLicenseNo = document.querySelector("input[name='driverLicense'][value='No']").checked ? "[cbc]" : "[cb]";

    const firearmLicenseYes = document.querySelector("input[name='firearmLicense'][value='Yes']").checked ? "[cbc]" : "[cb]";
    const firearmLicenseNo = document.querySelector("input[name='firearmLicense'][value='No']").checked ? "[cbc]" : "[cb]";

    // Criminal Record checkboxes
    const criminalLessThan20 = document.getElementById("criminalLessThan20").checked ? "[cbc]" : "[cb]";
    const criminalMoreThan20 = document.getElementById("criminalMoreThan20").checked ? "[cbc]" : "[cb]";
    const criminalMisdemeanors = document.getElementById("criminalMisdemeanors").checked ? "[cbc]" : "[cb]";
    const criminalFelonies = document.getElementById("criminalFelonies").checked ? "[cbc]" : "[cb]";
    const criminalRecordDetails = document.getElementById("criminalRecordDetails").value || "N/A";

    // Fingerprints checkbox
    const fingerprints = document.getElementById("fingerprints").checked ? "[cbc]" : "[cb]";

    const whyJoin = document.getElementById("whyJoin").value || "ANSWER";
    const whyGoodFit = document.getElementById("whyGoodFit").value || "ANSWER";
    const careerGoals = document.getElementById("careerGoals").value || "ANSWER";
    const referral = document.getElementById("referral").value || "N/A";

    const nickname = document.getElementById("nickname").value || "YOUR NAME";
    const age = document.getElementById("age").value || "AGE";
    const countryTimeZone = document.getElementById("countryTimeZone").value || "COUNTRY/TIMEZONE";
    const discordName = document.getElementById("discordName").value || "DISCORD";
    const forumName = document.getElementById("forumName").value || "FORUM ACCOUNT";
    const forumLink = document.getElementById("forumLink").value || "POST URL TO PROFILE HERE";

    const lspdFactionYes = document.querySelector("input[name='lspdFaction'][value='Yes']").checked ? "[cbc]" : "[cb]";
    const lspdFactionNo = document.querySelector("input[name='lspdFaction'][value='No']").checked ? "[cbc]" : "[cb]";
    const reinstatementApp = document.getElementById("reinstatementApp").value || "N/A";
    
    const panelScreenshot = document.getElementById("panelScreenshot").value || "ADD DIRECT IMAGE LINK TO YOUR SCREENSHOT REPLACING THIS TEXT IN CAPS ONLY";

    // Collect Character Name and Faction pairs
    const characterNames = document.getElementsByName("characterName[]");
    const factions = document.getElementsByName("faction[]");
    let factionList = "";

    for (let i = 0; i < characterNames.length; i++) {
        const charName = characterNames[i].value || "N/A";
        const faction = factions[i].value || "N/A";
        factionList += `${charName} - ${faction}\n`;
    }

    const factionServeryesBut = document.querySelector("input[name='factionServer'][value='yesBut']").checked ? "[cbc]" : "[cb]";
    const factionServeryesAnd = document.querySelector("input[name='factionServer'][value='yesAnd']").checked ? "[cbc]" : "[cb]";
    const factionServerNo = document.querySelector("input[name='factionServer'][value='No']").checked ? "[cbc]" : "[cb]";

    const factionServerExplanation = document.getElementById("factionServerExplanation").value || "N/A";

    const obligationsYes = document.querySelector("input[name='obligations'][value='Yes']").checked ? "[cbc]" : "[cb]";
    const obligationsNo = document.querySelector("input[name='obligations'][value='No']").checked ? "[cbc]" : "[cb]";

    const availabilityExplanation = document.getElementById("availabilityExplanation").value || "N/A";
    
    const microphoneYes = document.querySelector("input[name='microphone'][value='Yes']").checked ? "[cbc]" : "[cb]";
    const microphoneNo = document.querySelector("input[name='microphone'][value='No']").checked ? "[cbc]" : "[cb]";
    
    const microphoneExplanation = document.getElementById("microphoneExplanation").value || "N/A";

    const signature = document.getElementById("signature").value || "FIRST LASTNAME";
    const dateSigned = formatDate(document.getElementById("dateSigned").value) || "DD/MMM/YYYY";

    const bbcode = `[img]https://i.imgur.com/g6WHMsB.png[/img]
[lspdsubtitle]1. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white]
[list=none][b]1.1 - Full Name[/b] (Firstname Surname): 
[LIST=NONE]
${fullName}
[/LIST]
[b]1.2 - Date of Birth[/b]:
[LIST=NONE]
${dateOfBirth}
[/LIST]
[b]1.3 - Phone Number[/b]:
[LIST=NONE]
${phoneNumber}
[/LIST]

[b]1.4 - Proof of Identification[/b] [ooc] Screenshot of /licenses [/ooc] ([url=https://imgur.com/3VOTXMg][i]Example[/i][/url]):
[LIST=NONE]
[spoil]${proofOfIdentification}[/spoil]
[/LIST]
[/divbox]

[lspdsubtitle]2. EXPERIENCES, PAST EMPLOYMENT, AVAILABILITY AND REFERENCES[/lspdsubtitle]
[divbox=white]
[list=none][b]2.1 - Prior Employment[/b]:
If you have ever been employed by the LSEMS, SADOC, LSSD or SASG, you [b]must[/b] list your previous employment with them below.
[list][/list]
${combinedResults}

[b]2.2 - Work Shift Availability[/b]:
[ooc] Select the timezone(s) that you will play in. The times below are based on the server time (/time) which is UTC. [/ooc]
[size=90][c]Mark each box by changing [cb] to [cbc][/c][/size]
[LIST=NONE]
${workShiftMorning} Morning - 06:00 to 12:00
${workShiftAfternoon} Afternoon - 12:00 to 18:00
${workShiftEvening} Evening - 18:00 to 00:00
${workShiftNight} Night Shift - 00:00 to 06:00

[/LIST][/list]
[/divbox]

[lspdsubtitle]3. LICENSES, CRIMINAL AND MEDICAL HISTORIES[/lspdsubtitle]
[divbox=white]
[list=none][b]Please fill out your licensing, criminal and medical history, by choosing the appropriate box.[/b]
[size=90][c]Mark each box by changing [cb] to [cbc][/c][/size]

[b]3.1 - Do you currently possess a valid driver's license?[/b]
[LIST=NONE]
${driverLicenseYes} Yes
${driverLicenseNo} No
[/LIST]

[b]3.2 - Do you possess a valid firearm's license?[/b]
[LIST=NONE]
${firearmLicenseYes} Yes
${firearmLicenseNo} No
[/LIST]

[b]3.3 - Criminal Record:[/b]
[LIST=NONE]

${criminalLessThan20} Less than 20 Total Citations in 90 days, No Misdemeanors and No Felonies
${criminalMoreThan20} More than 20 Total Citations in 90 days
${criminalMisdemeanors} Previous Misdemeanors
${criminalFelonies} Previous Felonies
[/list]

[list=none][b]3.3.1 - If you have any misdemeanors or felonies, please explain here:[/b]
[LIST=NONE]
${criminalRecordDetails}
[/LIST][/list]

[b]3.4 - Fingerprints[/b]:
[list=none]
${fingerprints} Check this if you have had your fingerprints taken by Law Enforcement or Correctional Officers
[/list]
[/list]
[/divbox]

[lspdsubtitle]4. GENERAL QUESTIONS[/lspdsubtitle]
[divbox=white]
There is no fixed word limit, but the more effort you put into your answer, the stronger your chances of being accepted. 
[i]You must not use AI for your application, either to generate or correct your answers.[/i]
[list=none]
[b]4.1 - Why do you wish to join the Los Santos Police Department?[/b]
[LIST=NONE]
${whyJoin}
[/LIST]

[b]4.2 - Why do you think you would be a good fit for the Los Santos Police Department?[/b]
[LIST=NONE]
${whyGoodFit}
[/LIST]

[b]4.3 - What goals do you have for your career as a Police Officer? Any divisions or areas of interest in the LSPD?[/b]
[LIST=NONE]
${careerGoals}
[/LIST]

[b]4.4 - Do you have any current LSPD employees who you could use as a referral to support your application?[/b] [ooc] IC or OOC. [/ooc]
[LIST=NONE]
${referral}
[/LIST][/list]
[/divbox]

[lspdsubtitle](( 5. OUT-OF-CHARACTER INFORMATION AND QUESTIONS ))[/lspdsubtitle]
[divbox=white][list=none][b]Please fill out your out of character information and where appropriate, mark the appropriate box for checkbox answers.[/b]
[size=90][c]Mark each box by changing [cb] to [cbc][/c][/size]

[b]5.1 - About You:[/b] [LIST=NONE]
Name or Nickname: ${nickname}
Age: ${age}
Country of Residence and Time Zone: ${countryTimeZone}
Discord Name: ${discordName}
Eclipse RP Forum Account Name: ${forumName}
Eclipse RP Forum Profile Link: [url=${forumLink}]PRESS HERE[/url]
[/LIST]

[b]5.2 - Have you ever been in the LSPD faction before?[/b] ([i]applies to any character[/i])
[LIST=NONE]
${lspdFactionYes} Yes
${lspdFactionNo} No
[/LIST]

[list=none][b]5.2.1 - If yes to 5.2, provide your reinstatement application:[/b] 
[LIST=NONE]
[url=${reinstatementApp}]REINSTATEMENT APPLICATION[/url]
[/LIST][/list]

[b]5.3 - Provide a Screenshot of your Admin Panel and Characters ([url=https://imgur.com/wK0OQhv]press here for an example[/url]):[/b]
[LIST=NONE]
[spoil]${panelScreenshot}[/spoil]
[/LIST]

[b]5.4 - List all the factions you are currently a part of ([i]include all your characters in factions[/i]):[/b]
[LIST=NONE]
${factionList}
[/LIST]

[b]5.5 - Are you currently involved in and/or currently play on any other GTA Roleplay servers or communities?[/b]
[LIST=NONE]
${factionServeryesBut} Yes, but not in a faction there
${factionServeryesAnd} Yes, and in a faction there
${factionServerNo} No
[/LIST]

[list=none][b]5.5.1 - If yes to 5.5, please explain further about your overall involvement in that server and what factions you are in, if applicable:[/b]
[LIST=NONE]
${factionServerExplanation}
[/LIST][/list]

[b]5.6 - Do you have any upcoming obligation(s) which may limit your playing time or availability in the next three months?[/b]
[LIST=NONE]
${obligationsYes} Yes
${obligationsNo} No
[/LIST]

[list=none][b]5.6.1 - If yes to 5.6, please explain how much this might affect your availability or play time:[/b] 
[LIST=NONE]
${availabilityExplanation}
[/LIST][/list]

[b]5.7 - Do you have a functional microphone and are you able to use TeamSpeak?[/b]
[LIST=NONE]
${microphoneYes} Yes
${microphoneNo} No
[/LIST]

[list=none][b]5.7.1 - If no to 5.7, please explain here why you cannot use a microphone/TeamSpeak:[/b]
[LIST=NONE]
${microphoneExplanation}
[/LIST]

[/list][/divbox]

[lspdsubtitle]6. RELEASE AND WAIVER[/lspdsubtitle]
[divbox=white]

[divbox=#ffffde] I, the undersigned, hereby certify that this application and the answers contained within this application are true and complete to the best of my knowledge. By agreeing below I hereby authorize the Recruitment Officers of the Los Santos Police Department Recruitment and Employment Division to obtain any information pertaining to my current and previous employment(s), education, current and past residence(s), further personal information, and any other information that may be relevant to potential employment with the Los Santos Police Department.

I understand and agree that the Los Santos Police Department reserves the right to remove applicants from the recruitment process for any reason, with or without prior notice, and to ban applicants from (re-applying) to the Los Santos Police Department, temporarily or permanently, and that these decisions may be appealed either through the Recruitment and Employment Division Command Staff or the Internal Affairs Division. [/divbox]
[list=none]

[b]6.1 Signature:[/b] ${signature} 
[b]6.2 Date Signed:[/b] ${dateSigned}

[/list][/divbox]
[lspdfooter][/lspdfooter]`;

    document.getElementById('bbcodeOutput').textContent = bbcode;
    document.getElementById('bbcodeContainer').classList.remove('hidden');

    showCustomModal("Do you want to copy the format and open the forums?", () => {
        // Copy the text to the clipboard
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });

        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=89", "_blank");
    });
}

// BBCode generation functions for other forms

// Standard Firearm License
function generateStandardFirearmBBCode() {
    // Validate first
    const errors = validateStandardFirearm();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("sf_fullName").value || "Answer here";
    const dateOfBirth = formatDate(document.getElementById("sf_dateOfBirth").value) || "DD/MMM/YYYY";
    const phoneNumber = document.getElementById("sf_phoneNumber").value || "3334444";
    const residenceAddress = document.getElementById("sf_residenceAddress").value || "Answer here";
    const driversLicense = document.getElementById("sf_driversLicense").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    
    const whyFirearm = document.getElementById("sf_whyFirearm").value || "Answer here";
    const storage = document.getElementById("sf_storage").value || "Answer here";
    
    const signature = document.getElementById("sf_signature").value || "Full Name";
    const dateSigned = formatDate(document.getElementById("sf_dateSigned").value) || "DD/MMM/YYYY";
    
    const panelScreenshot = document.getElementById("sf_panelScreenshot").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    const understand = document.getElementById("sf_understand").value || "Answer here";
    
    // Collect firearm selections
    const firearms = [
        { id: "sf_doubleAction", name: "Double-Action Revolver" },
        { id: "sf_heavyRevolver", name: "Heavy Revolver" },
        { id: "sf_heavyRevolverMk2", name: "Heavy Revolver Mk II" },
        { id: "sf_navyRevolver", name: "Navy Revolver" },
        { id: "sf_pistol", name: "Pistol" },
        { id: "sf_pistolMk2", name: "Pistol Mk II" },
        { id: "sf_pistol50", name: "Pistol .50" },
        { id: "sf_heavyPistol", name: "Heavy Pistol" },
        { id: "sf_combatPistol", name: "Combat Pistol" },
        { id: "sf_snsPistol", name: "SNS Pistol" },
        { id: "sf_snsPistolMk2", name: "SNS Pistol Mk II" },
        { id: "sf_vintagePistol", name: "Vintage Pistol" },
        { id: "sf_wm29Pistol", name: "WM 29 Pistol" },
        { id: "sf_flareGun", name: "Flare Gun" }
    ];
    
    let firearmList = "";
    firearms.forEach(firearm => {
        const checked = document.getElementById(firearm.id).checked ? "[cbc]" : "[cb]";
        firearmList += `${checked}${firearm.name}\n`;
    });
    
    const bbcode = `[img]https://i.imgur.com/7xDaTUa.png[/img]
[lspdsubtitle]A. PERSONAL INFORMATION[/lspdsubtitle][divbox=white][list=none]
[b]A1. Full Name:[/b] ${fullName}
[b]A2. Date of Birth:[/b] ${dateOfBirth}
[b]A3. Phone Number:[/b] ${phoneNumber}
[b]A4. Residence Address:[/b] ${residenceAddress}
[b]A5. Please attach a photocopy of your driver's licenses [url=https://i.imgur.com/ZxCDICM.png]*Example*[/url]:[/b][list=none]
[url=${driversLicense}]*Drivers license*[/url]
[/list][/divbox]

[lspdsubtitle]B. DESCRIPTION OF WEAPONS[/lspdsubtitle][divbox=white][list=none]
[b]B1. Why do you wish to own a personal firearm license? (If selecting a Flare Gun please additionally explain the reasoning for this)[/b]
[list=none]
${whyFirearm}
[/list][b]B2. Which firearms do you wish to be licensed for? (You may select up to 2)[/b]
[size=90][c]Mark each box by changing [cb] to [cbc] [/c][/size][list=none]
${firearmList}[/list]
[b]B3. How do you plan on storing your personal firearm(s) when they are not on your person?[/b][list=none]
${storage}
[/list][/list][/divbox]

[lspdsubtitle]C. RULES AND RESTRICTIONS[/lspdsubtitle]
[divbox=white]
[list=none]
The licensee is responsible for all liability for, injury to, or death of any person, or damage to any property which may result through any act or omission of either the licensee or the agency that issued the license. In the event any claim, suit, or action is brought against the agency that issued the license, its chief officer, or any of its employees, by reason of, or in connection with any such act or omission, the licensee shall defend, indemnify, and hold harmless the agency that issued the license, its chief officer or any of its employees from such claim, suit, or action.

The licensee authorizes the licensing agency to investigate, as they deem necessary, the licensee's record and character to ascertain any and all information which may concern his/her qualifications and justification to be issued a license to carry a personal firearm and release said agency of any and all liability arising out of such investigation.

I hereby certify under penalties of providing a false statement that the answers I have given are true and correct to the best of my knowledge and belief and that I understand and agree to the provisions, conditions, and restrictions herein or otherwise imposed. I hereby declare that I have read and understood the [url=https://gov.eclipse-rp.net/viewtopic.php?t=143396]Requirements & Regulations[/url] and understand the consequences that follow should I violate them.

[b]C1. Signature:[/b] ${signature}
[b]C2. Date Signed:[/b] ${dateSigned}
[/list][/divbox]

[lspdsubtitle]D. (( OUT-OF-CHARACTER INFORMATION ))[/lspdsubtitle][divbox=white][list=none]
[b]D1. Please upload a screenshot of your admin logs and character names [url=https://i.imgur.com/YnGWz1D.png]*Example*[/url][/b]:[list=none]
[url=${panelScreenshot}]*Panel Screenshot*[/url]
[/list][b]D2. Do you understand that applying for a firearms license for the sole purpose of delivering weapons to any of your other characters or friends of your other characters constitutes as metagaming & is also a violation of Eclipse RP's OOC trading/RMT rule?[/b]
${understand}
[/list][/divbox][lspdfooter]`;
    
    document.getElementById('sf_bbcodeOutput').textContent = bbcode;
    document.getElementById('sf_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=557", "_blank");
    });
}

// Clear Standard Firearm data
function clearStandardFirearmData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#standard-firearm input[type='text'], #standard-firearm textarea").forEach(el => el.value = "");
        document.querySelectorAll("#standard-firearm input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#standard-firearm input[type='checkbox']").forEach(el => el.checked = false);
        document.getElementById("sf_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Priors Firearm BBCode
function generatePriorsFirearmBBCode() {
    // Validate first
    const errors = validatePriorsFirearm();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("pf_fullName").value || "Answer here";
    const dateOfBirth = formatDate(document.getElementById("pf_dateOfBirth").value) || "DD/MMM/YYYY";
    const phoneNumber = document.getElementById("pf_phoneNumber").value || "3334444";
    const residenceAddress = document.getElementById("pf_residenceAddress").value || "Answer here";
    const driversLicense = document.getElementById("pf_driversLicense").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    
    const levelFour = document.getElementById("pf_levelFour").value || "Answer here";
    const levelThree = document.getElementById("pf_levelThree").value || "Answer here";
    const levelTwo = document.getElementById("pf_levelTwo").value || "Answer here";
    const levelOne = document.getElementById("pf_levelOne").value || "Answer here";
    const revoked = document.getElementById("pf_revoked").value || "Answer here";
    
    const whyFirearm = document.getElementById("pf_whyFirearm").value || "Answer here";
    const storage = document.getElementById("pf_storage").value || "Answer here";
    
    const signature = document.getElementById("pf_signature").value || "Full Name";
    const dateSigned = formatDate(document.getElementById("pf_dateSigned").value) || "DD/MMM/YYYY";
    
    const panelScreenshot = document.getElementById("pf_panelScreenshot").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    const understand = document.getElementById("pf_understand").value || "Answer here";
    
    // Collect firearm selections
    const firearms = [
        { id: "pf_doubleAction", name: "Double-Action Revolver" },
        { id: "pf_heavyRevolver", name: "Heavy Revolver" },
        { id: "pf_heavyRevolverMk2", name: "Heavy Revolver Mk II" },
        { id: "pf_navyRevolver", name: "Navy Revolver" },
        { id: "pf_pistol", name: "Pistol" },
        { id: "pf_pistolMk2", name: "Pistol Mk II" },
        { id: "pf_pistol50", name: "Pistol .50" },
        { id: "pf_heavyPistol", name: "Heavy Pistol" },
        { id: "pf_combatPistol", name: "Combat Pistol" },
        { id: "pf_snsPistol", name: "SNS Pistol" },
        { id: "pf_snsPistolMk2", name: "SNS Pistol Mk II" },
        { id: "pf_vintagePistol", name: "Vintage Pistol" },
        { id: "pf_wm29Pistol", name: "WM 29 Pistol" },
        { id: "pf_flareGun", name: "Flare Gun" }
    ];
    
    let firearmList = "";
    firearms.forEach(firearm => {
        const checked = document.getElementById(firearm.id).checked ? "[cbc]" : "[cb]";
        firearmList += `${checked}${firearm.name}\n`;
    });
    
    const bbcode = `[img]https://i.imgur.com/BcVCzsx.png[/img]
[lspdsubtitle]A. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]A1. Full Name:[/b] ${fullName}
[b]A2. Date of Birth:[/b] ${dateOfBirth}
[b]A3. Phone Number:[/b] ${phoneNumber}
[b]A4. Residence Address:[/b] ${residenceAddress}
[b]A5. Please attach a photocopy of your driver's licenses [url=https://i.imgur.com/ZxCDICM.png]*Example*[/url]:[/b][list=none]
[url=${driversLicense}]*Drivers license*[/url]
[/list]
[b]A6. Is your record clear of Level Four charges?[/b] ${levelFour}
[b]A7. Is your record 6 months clear of Level Three charges?[/b] ${levelThree}
[b]A8. Is your record 3 months clear of Level Two charges?[/b] ${levelTwo}
[b]A9. Is your record 1 month clear of Level One charges?[/b] ${levelOne}
[b]A10. Was your firearms license revoked within the past month?[/b] ${revoked}
[/divbox]

[lspdsubtitle]B. DESCRIPTION OF WEAPONS[/lspdsubtitle]
[divbox=white][list=none]
[b]B1. Why do you wish to own a personal firearm license? (If selecting a Flare Gun please additionally explain the reasoning for this)[/b][list=none]
${whyFirearm}
[/list]
[b]B2. Which firearms do you wish to be licensed for? (You may select up to 2)[/b]
[size=90][c]Mark each box by changing [cb] to [cbc] [/c][/size][list=none]
${firearmList}[/list][b]B3. How do you plan on storing your personal firearm(s) when they are not on your person?[/b][list=none]
${storage}
[/list][/list][/divbox]

[lspdsubtitle]C. RULES AND RESTRICTIONS[/lspdsubtitle]
[divbox=white]
[list=none]
The licensee is responsible for all liability for, injury to, or death of any person, or damage to any property which may result through any act or omission of either the licensee or the agency that issued the license. In the event any claim, suit, or action is brought against the agency that issued the license, its chief officer, or any of its employees, by reason of, or in connection with any such act or omission, the licensee shall defend, indemnify, and hold harmless the agency that issued the license, its chief officer or any of its employees from such claim, suit, or action.

The licensee authorizes the licensing agency to investigate, as they deem necessary, the licensee's record and character to ascertain any and all information which may concern his/her qualifications and justification to be issued a license to carry a personal firearm and release said agency of any and all liability arising out of such investigation.

I hereby certify under penalties of providing a false statement that the answers I have given are true and correct to the best of my knowledge and belief and that I understand and agree to the provisions, conditions, and restrictions herein or otherwise imposed. I hereby declare that I have read and understood the [url=https://gov.eclipse-rp.net/viewtopic.php?t=143396]Requirements & Regulations[/url] and understand the consequences that follow should I violate them.

[b]C1. Signature:[/b] ${signature}
[b]C2. Date Signed:[/b] ${dateSigned}
[/list]
[/divbox]

[lspdsubtitle]D. (( OUT-OF-CHARACTER INFORMATION ))[/lspdsubtitle]
[divbox=white][list=none]
[b]D1. Please upload a screenshot of your admin logs and character names [url=https://i.imgur.com/YnGWz1D.png]*Example*[/url][/b]:[list=none]
[url=${panelScreenshot}]*Panel Screenshot*[/url]
[/list][b]D2. Do you understand that applying for a firearms license for the sole purpose of delivering weapons to any of your other characters or friends of your other characters constitutes as metagaming & is also a violation of Eclipse RP's OOC trading/RMT rule?[/b]
${understand}
[/list][/divbox][lspdfooter]`;
    
    document.getElementById('pf_bbcodeOutput').textContent = bbcode;
    document.getElementById('pf_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=557", "_blank");
    });
}

// Clear Priors Firearm data
function clearPriorsFirearmData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#priors-firearm input[type='text'], #priors-firearm textarea").forEach(el => el.value = "");
        document.querySelectorAll("#priors-firearm input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#priors-firearm input[type='checkbox']").forEach(el => el.checked = false);
        document.getElementById("pf_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Shotgun License BBCode
function generateShotgunLicenseBBCode() {
    // Validate first
    const errors = validateShotgunLicense();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("sl_fullName").value || "Answer here";
    const dateOfBirth = formatDate(document.getElementById("sl_dateOfBirth").value) || "DD/MMM/YYYY";
    const phoneNumber = document.getElementById("sl_phoneNumber").value || "3334444";
    const residenceAddress = document.getElementById("sl_residenceAddress").value || "Answer here";
    const driversLicense = document.getElementById("sl_driversLicense").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    
    const whyShotgun = document.getElementById("sl_whyShotgun").value || "Answer here";
    const storage = document.getElementById("sl_storage").value || "Answer here";
    
    const pumpShotgun = document.querySelector('input[name="sl_shotgunType"][value="pump"]')?.checked ? "[cbc]" : "[cb]";
    const pumpShotgunMk2 = document.querySelector('input[name="sl_shotgunType"][value="pumpMk2"]')?.checked ? "[cbc]" : "[cb]";
    
    const signature = document.getElementById("sl_signature").value || "Full Name";
    const dateSigned = formatDate(document.getElementById("sl_dateSigned").value) || "DD/MMM/YYYY";
    
    const paymentReceipt = document.getElementById("sl_paymentReceipt").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    const panelScreenshot = document.getElementById("sl_panelScreenshot").value || "REPLACE THIS TEXT WITH LINK TO IMAGE";
    const understand = document.getElementById("sl_understand").value || "Answer here";
    
    const bbcode = `[img]https://i.imgur.com/eZLjUYw.png[/img]
[lspdsubtitle]A. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]A1. Full Name:[/b] ${fullName}
[b]A2. Date of Birth:[/b] ${dateOfBirth}
[b]A3. Phone Number:[/b] ${phoneNumber}
[b]A4. Residence Address:[/b] ${residenceAddress}
[b]A5. Please attach a photocopy of your driver's license [url=https://i.imgur.com/ZxCDICM.png]*Example*[/url]:[/b][list=none]
[url=${driversLicense}]*Drivers license*[/url]
[/list]
[/divbox]

[lspdsubtitle]B. DESCRIPTION OF SHOTGUN[/lspdsubtitle]
[divbox=white][list=none]
[b]B1. Why do you wish to own a shotgun license?[/b][list=none]
${whyShotgun}
[/list][b]B2. Which shotgun do you wish to be licensed for? (You may select only one)[/b]
[size=90][c]Mark each box by changing [cb] to [cbc] [/c][/size][list=none]
${pumpShotgun}Pump Shotgun
${pumpShotgunMk2}Pump Shotgun Mk II
[/list][b]B3. How do you plan on storing your shotgun?[/b][list=none]
${storage}
[/list][/list][/divbox]

[lspdsubtitle]C. RULES AND RESTRICTIONS[/lspdsubtitle]
[divbox=white]
[list=none]
The licensee is responsible for all liability for, injury to, or death of any person, or damage to any property which may result through any act or omission of either the licensee or the agency that issued the license. In the event any claim, suit, or action is brought against the agency that issued the license, its chief officer, or any of its employees, by reason of, or in connection with any such act or omission, the licensee shall defend, indemnify, and hold harmless the agency that issued the license, its chief officer or any of its employees from such claim, suit, or action.

The licensee authorizes the licensing agency to investigate, as they deem necessary, the licensee's record and character to ascertain any and all information which may concern his/her qualifications and justification to be issued a license to carry a personal firearm and release said agency of any and all liability arising out of such investigation.

I hereby certify under penalties of providing a false statement that the answers I have given are true and correct to the best of my knowledge and belief and that I understand and agree to the provisions, conditions, and restrictions herein or otherwise imposed. I hereby declare that I have read and understood the [url=https://gov.eclipse-rp.net/viewtopic.php?t=143396]Requirements & Regulations[/url] and understand the consequences that follow should I violate them.

[b]C1. Signature:[/b] ${signature}
[b]C2. Date Signed:[/b] ${dateSigned}
[/list]
[/divbox]

[lspdsubtitle]D. SHOTGUN LICENSE PAYMENT[/lspdsubtitle]
[divbox=white]
[list=none]
This section is to submit your payment receipt for the $10,000 shotgun license application fee.
[ooc] The screenshot image must the chat box message of paying the government using /donategov[b] [url=https://i.imgur.com/8VqMAC8.png]*Example*[/url][/b][/ooc][list=none]
[url=${paymentReceipt}]*Payment receipt*[/url]
[/list][/list]
[/divbox]
[lspdfooter]`;
    
    document.getElementById('sl_bbcodeOutput').textContent = bbcode;
    document.getElementById('sl_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=557", "_blank");
    });
}

// Clear Shotgun License data
function clearShotgunLicenseData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#shotgun-license input[type='text'], #shotgun-license textarea").forEach(el => el.value = "");
        document.querySelectorAll("#shotgun-license input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#shotgun-license input[type='radio']").forEach(el => el.checked = false);
        document.getElementById("sl_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Firearm Change Request BBCode
function generateFirearmChangeBBCode() {
    // Validate first
    const errors = validateFirearmChange();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("fc_fullName").value || "Insert Answer Here.";
    const phoneNumber = document.getElementById("fc_phoneNumber").value || "3334444";
    const flareReason = document.getElementById("fc_flareReason").value || "N/A";
    const paymentProof = document.getElementById("fc_paymentProof").value || "ADD YOUR IMAGE LINK HERE";
    const signature = document.getElementById("fc_signature").value || "Full Name";
    const dateSigned = formatDate(document.getElementById("fc_dateSigned").value) || "DD/MMM/YYYY";
    
    // Collect current firearms
    const currentFirearms = [
        { id: "fc_current_doubleAction", name: "Double-Action Revolver" },
        { id: "fc_current_heavyRevolver", name: "Heavy Revolver" },
        { id: "fc_current_heavyRevolverMk2", name: "Heavy Revolver Mk II" },
        { id: "fc_current_navyRevolver", name: "Navy Revolver" },
        { id: "fc_current_pistol", name: "Pistol" },
        { id: "fc_current_pistolMk2", name: "Pistol Mk II" },
        { id: "fc_current_pistol50", name: "Pistol .50" },
        { id: "fc_current_heavyPistol", name: "Heavy Pistol" },
        { id: "fc_current_combatPistol", name: "Combat Pistol" },
        { id: "fc_current_snsPistol", name: "SNS Pistol" },
        { id: "fc_current_snsPistolMk2", name: "SNS Pistol Mk II" },
        { id: "fc_current_vintagePistol", name: "Vintage Pistol" },
        { id: "fc_current_wm29Pistol", name: "WM 29 Pistol" },
        { id: "fc_current_flareGun", name: "Flare Gun" }
    ];
    
    let currentFirearmList = "";
    currentFirearms.forEach(firearm => {
        const checked = document.getElementById(firearm.id).checked ? "[cbc]" : "[cb]";
        currentFirearmList += `${checked}${firearm.name}\n`;
    });
    
    // Collect wished firearms
    const wishedFirearms = [
        { id: "fc_wish_doubleAction", name: "Double-Action Revolver" },
        { id: "fc_wish_heavyRevolver", name: "Heavy Revolver" },
        { id: "fc_wish_heavyRevolverMk2", name: "Heavy Revolver Mk II" },
        { id: "fc_wish_navyRevolver", name: "Navy Revolver" },
        { id: "fc_wish_pistol", name: "Pistol" },
        { id: "fc_wish_pistolMk2", name: "Pistol Mk II" },
        { id: "fc_wish_pistol50", name: "Pistol .50" },
        { id: "fc_wish_heavyPistol", name: "Heavy Pistol" },
        { id: "fc_wish_combatPistol", name: "Combat Pistol" },
        { id: "fc_wish_snsPistol", name: "SNS Pistol" },
        { id: "fc_wish_snsPistolMk2", name: "SNS Pistol Mk II" },
        { id: "fc_wish_vintagePistol", name: "Vintage Pistol" },
        { id: "fc_wish_wm29Pistol", name: "WM 29 Pistol" },
        { id: "fc_wish_flareGun", name: "Flare Gun" }
    ];
    
    let wishedFirearmList = "";
    wishedFirearms.forEach(firearm => {
        const checked = document.getElementById(firearm.id).checked ? "[cbc]" : "[cb]";
        wishedFirearmList += `${checked}${firearm.name}\n`;
    });
    
    const bbcode = `[img]https://i.imgur.com/xzFkaUQ.png[/img]
[lspdsubtitle]1. REQUESTEE DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]
[b]FULL NAME[/b]: ${fullName}
[b]PHONE NUMBER[/b]: ${phoneNumber}
[/list]
[/divbox]

[lspdsubtitle]2. FIREARM DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]
[b]Which firearm(s) are you currently licensed for?:[/b]
[size=90][c]Mark each box by changing [cb] to [cbc] [/c][/size][list=none]
${currentFirearmList}[/list]
[b]Which firearm(s) do you wish to be licensed for?:[/b]
[size=90][c]Mark each box by changing [cb] to [cbc] [/c][/size][list=none]
${wishedFirearmList}[/list]
[b]If selecting a Flare Gun please additionally explain the reasoning for this:[/b]
${flareReason}
[/list]
[/divbox]

[lspdsubtitle]3. AMENDMENT PAYMENT[/lspdsubtitle]
[divbox=white]
[list=none]
Use this section to post the receipt of you paying the Amendment Fee of $2,500 to change your firearms license.
[b]Proof of Payment[/b]
[spoil]
[ooc] Attach a screenshot of the /DonateGovernment message. [b][url=https://i.imgur.com/Cm46lBJ.png]Example image[/url][/b]. [/ooc]
[img]${paymentProof}[/img]
[/spoil]
[/list]
[/divbox]

[lspdsubtitle]4. DECLARATION[/lspdsubtitle]
[divbox=white]
[list=none]
By signing and submitting this form you agree that the information provided is accurate and truthful. If the information provided is deemed to be false or inaccurate, you will be subject to receiving the criminal charges of [b]GF07 - Fraud[/b] and [b]GM12 - Giving False Information to a Police Officer[/b]. Your firearms license may also be revoked.

[b]SIGNATURE:[/b] ${signature}
[b]DATE:[/b] ${dateSigned}
[/list]
[/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('fc_bbcodeOutput').textContent = bbcode;
    document.getElementById('fc_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1377", "_blank");
    });
}

// Clear Firearm Change data
function clearFirearmChangeData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#firearm-change input[type='text'], #firearm-change textarea").forEach(el => el.value = "");
        document.querySelectorAll("#firearm-change input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#firearm-change input[type='checkbox']").forEach(el => el.checked = false);
        document.getElementById("fc_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Firearm Submission BBCode
function generateFirearmSubmissionBBCode() {
    // Validate first
    const errors = validateFirearmSubmission();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("fs_fullName").value || "Insert Answer Here.";
    const phoneNumber = document.getElementById("fs_phoneNumber").value || "Insert Answer Here.";
    const firearms = document.getElementById("fs_firearms").value || "Add Firearm Name(s) Here, with the Serial Numbers of your currently owned firearms.";
    
    const bbcode = `[img]https://i.imgur.com/i6ZWvJr.png[/img]
[lspdsubtitle]1. REQUESTEE DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]
[b]FULL NAME[/b]: ${fullName}
[b]PHONE NUMBER[/b]: ${phoneNumber}
[/list]
[/divbox]

[lspdsubtitle]2. FIREARM DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]
[b]Which firearm(s) are you wishing to turn-in?[/b]:
[list=none]
${firearms}
[/list]
[/list]
[/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('fs_bbcodeOutput').textContent = bbcode;
    document.getElementById('fs_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1377", "_blank");
    });
}

// Clear Firearm Submission data
function clearFirearmSubmissionData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#firearm-submission input[type='text'], #firearm-submission textarea").forEach(el => el.value = "");
        document.getElementById("fs_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Missing Firearm BBCode
function generateMissingFirearmBBCode() {
    // Validate first
    const errors = validateMissingFirearm();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("mf_fullName").value || "Insert Answer Here.";
    const phoneNumber = document.getElementById("mf_phoneNumber").value || "3334444";
    const missingFirearms = document.getElementById("mf_missingFirearms").value || "Insert Answer Here.";
    const status = document.getElementById("mf_status").value || "Add Status Here.";
    const serialDetails = document.getElementById("mf_serialDetails").value || "";
    const lossDetails = document.getElementById("mf_lossDetails").value || "Insert Answer Here.";
    const deathLoss = document.getElementById("mf_deathLoss").value || "Insert Answer Here.";
    const paymentProof = document.getElementById("mf_paymentProof").value || "ADD_YOUR_IMAGE_LINK_HERE";
    const dateSigned = formatDate(document.getElementById("mf_dateSigned").value) || "DD/MMM/YYYY";
    const signature = document.getElementById("mf_signature").value || "Full Name";
    
    const bbcode = `[img]https://i.imgur.com/dOiGWoM.png[/img]
[lspdsubtitle]1. REQUESTEE DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]
[b]FULL NAME[/b]: ${fullName}
[b]PHONE NUMBER[/b]: ${phoneNumber}
[/list]
[/divbox]

[lspdsubtitle]2. MISSING FIREARM DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]
[b]Which firearm(s) are you currently reporting as missing?[/b]:
[list=none]
${missingFirearms}
[/list]
[b]What is the status of the firearm(s) that are missing?[/b] (Lost or Stolen):
[list=none]
${status}
[/list]
[b]Do you know the serial numbers of the firearm(s) you reported as missing?[/b]:
[list=none]${serialDetails}
[/list]
[b]Please share any relevant details to explain the loss of your firearm[/b]:
[list=none]
${lossDetails}
[/list]
[b](( Was the firearm lost due to your character dying?[/b]:
[list=none]
${deathLoss}
[/list]
[b]))[/b][/list]
[/divbox]

[lspdsubtitle]3. EXCESS REPORT PAYMENT[/lspdsubtitle]
[divbox=white]
[list=none]
Firearms license holders are subject to a [b]$2,000[/b] fee when submitting a missing firearm report. The fee increases to [b]$5,000[/b] when submitting a missing shotgun report.
[b]Proof of Payment[/b]
[spoil]
[ooc] The screenshot image must the chat box message of paying the government using /donategov[b] [url=https://i.imgur.com/8VqMAC8.png]*Example*[/url][/b] [/ooc]
${paymentProof}
[/spoil]
[/list]
[/divbox]

[lspdsubtitle]4. DECLARATION[/lspdsubtitle]
[divbox=white]
[list=none]
By signing and submitting this form you agree that the information provided is accurate and truthful. If the information provided is deemed to be false or inaccurate, you will be subject to receiving the criminal charges of [b]GF07 - Fraud[/b] and [b]GM12 - Giving False Information to a Police Officer[/b]. Your firearms license may also be revoked.

[b]DATE:[/b] ${dateSigned}
[b]SIGNATURE:[/b] ${signature}
[/list]
[/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('mf_bbcodeOutput').textContent = bbcode;
    document.getElementById('mf_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1378", "_blank");
    });
}

// Clear Missing Firearm data
function clearMissingFirearmData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#missing-firearm input[type='text'], #missing-firearm textarea").forEach(el => el.value = "");
        document.querySelectorAll("#missing-firearm input[type='date']").forEach(el => el.value = "");
        document.getElementById("mf_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Guard Card BBCode
function generateGuardCardBBCode() {
    // Validate first
    const errors = validateGuardCard();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("gc_fullName").value || "Answer here";
    const dateOfBirth = formatDate(document.getElementById("gc_dateOfBirth").value) || "DD/MMM/YYYY";
    const phoneNumber = document.getElementById("gc_phoneNumber").value || "3334444";
    const residenceAddress = document.getElementById("gc_residenceAddress").value || "Answer here";
    const businessName = document.getElementById("gc_businessName").value || "Answer here";
    const businessLicense = document.getElementById("gc_businessLicense").value || "INSERT_LINK_HERE";
    const firearmsLicense = document.getElementById("gc_firearmsLicense").value || "INSERT_LINK_HERE";
    
    const whyGuardCard = document.getElementById("gc_whyGuardCard").value || "Answer here";
    
    const signature = document.getElementById("gc_signature").value || "Full Name";
    const dateSigned = formatDate(document.getElementById("gc_dateSigned").value) || "DD/MMM/YYYY";
    
    const paymentReceipt = document.getElementById("gc_paymentReceipt").value || "INSERT_LINK_HERE";
    
    // Get selected pistol
    const pistolMap = {
        "doubleAction": "Double-Action Revolver",
        "heavyRevolver": "Heavy Revolver",
        "heavyRevolverMk2": "Heavy Revolver Mk II",
        "navyRevolver": "Navy Revolver",
        "pistol": "Pistol",
        "pistolMk2": "Pistol Mk II",
        "pistol50": "Pistol .50",
        "heavyPistol": "Heavy Pistol",
        "combatPistol": "Combat Pistol",
        "snsPistol": "SNS Pistol",
        "snsPistolMk2": "SNS Pistol Mk II",
        "vintagePistol": "Vintage Pistol",
        "wm29Pistol": "WM 29 Pistol"
    };
    
    let pistolList = "";
    Object.keys(pistolMap).forEach(key => {
        const checked = document.querySelector(`input[name="gc_pistolType"][value="${key}"]`)?.checked ? "[cbc]" : "[cb]";
        pistolList += `${checked}${pistolMap[key]}\n`;
    });
    
    const bbcode = `[img]https://i.imgur.com/xL2VKDH.png[/img]
[lspdsubtitle]A. PERSONAL & BUSINESS INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]A1. Full Name:[/b] ${fullName}
[b]A2. Date of Birth:[/b] ${dateOfBirth}
[b]A3. Phone Number:[/b] ${phoneNumber}
[b]A4. Residence Address:[/b] ${residenceAddress}
[b]A5. Business Name:[/b] ${businessName}
[b]A7. Please attach a link to the active business license:[/b][list=none]
[url=${businessLicense}]*Business license*[/url]
[/list]
[b]A8. Please attach a photocopy of your firearms license [url=https://i.imgur.com/B5dbvGa.png]*Example*[/url]:[/b][list=none]
[url=${firearmsLicense}]*Firearms license*[/url]
[/list]
[/divbox][lspdsubtitle]B. WEAPONS & USAGE INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]B1. Why do you wish to own a Guard Card?[/b][list=none]
${whyGuardCard}
[/list][b]B2. Which of your already authorized pistols do you wish to utilise? (You may select only one)[/b]
[size=90][c]Mark each box by changing [cb] to [cbc] [/c][/size][list=none]
${pistolList}[/list][/list][/divbox]

[lspdsubtitle]C. RULES AND RESTRICTIONS[/lspdsubtitle]
[divbox=white]
[list=none]
The licensee is responsible for all liability for, injury to, or death of any person, or damage to any property which may result through any act or omission of either the licensee or the agency that issued the license. In the event any claim, suit, or action is brought against the agency that issued the license, its chief officer, or any of its employees, by reason of, or in connection with any such act or omission, the licensee shall defend, indemnify, and hold harmless the agency that issued the license, its chief officer or any of its employees from such claim, suit, or action.

The licensee authorizes the licensing agency to investigate, as they deem necessary, the licensee's record and character to ascertain any and all information which may concern his/her qualifications and justification to be issued a license to carry a personal firearm and release said agency of any and all liability arising out of such investigation.

I hereby certify under penalties of providing a false statement that the answers I have given are true and correct to the best of my knowledge and belief and that I understand and agree to the provisions, conditions, and restrictions herein or otherwise imposed. I hereby declare that I have read and understood the [url=https://gov.eclipse-rp.net/viewtopic.php?t=172255]Requirements & Regulations[/url] and understand the consequences that follow should I violate them.

[b]C1. Signature:[/b] ${signature}
[b]C2. Date Signed:[/b] ${dateSigned}
[/list]
[/divbox]

[lspdsubtitle]D. GUARD CARD PAYMENT[/lspdsubtitle]
[divbox=white]
[list=none]
This section is to submit your payment receipt for the non-refundable $25,000 Guard Card application fee.
[ooc]The screenshot image must show the chat box message of paying the government using /donategov[b] [url=https://i.imgur.com/8VqMAC8.png]*Example*[/url][/b][/ooc][list=none]
[url=${paymentReceipt}]*Payment receipt*[/url]
[/list][/list]
[/divbox]
[lspdfooter]`;

    document.getElementById('gc_bbcodeOutput').textContent = bbcode;
    document.getElementById('gc_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=3729", "_blank");
    });
}

// Clear Guard Card data
function clearGuardCardData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#guard-card input[type='text'], #guard-card textarea").forEach(el => el.value = "");
        document.querySelectorAll("#guard-card input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#guard-card input[type='radio']").forEach(el => el.checked = false);
        document.getElementById("gc_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Reinstatement BBCode
function generateReinstatementBBCode() {
    // Validate first
    const errors = validateReinstatement();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const firstName = document.getElementById("re_firstName").value || "Answer.";
    const middleName = document.getElementById("re_middleName").value || "Answer.";
    const lastName = document.getElementById("re_lastName").value || "Answer.";
    
    const formerRank = document.getElementById("re_formerRank").value || "Answer.";
    const endDate = document.getElementById("re_endDate").value || "Answer.";
    const reason = document.getElementById("re_reason").value || "Answer.";
    const desiredRank = document.getElementById("re_desiredRank").value || "Answer.";
    const desiredAssignment = document.getElementById("re_desiredAssignment").value || "Answer.";
    
    const whatDone = document.getElementById("re_whatDone").value || "Answer.";
    const resignationReason = document.getElementById("re_resignationReason").value || "Answer.";
    
    const company = document.getElementById("re_company").value || "Answer.";
    const position = document.getElementById("re_position").value || "Answer.";
    const employmentEndDate = document.getElementById("re_employmentEndDate").value || "Answer.";
    const employmentReason = document.getElementById("re_employmentReason").value || "Answer.";
    
    const oocDone = document.getElementById("re_oocDone").value || "Answer.";
    const panelScreenshot = document.getElementById("re_panelScreenshot").value || "SCREENSHOT LINK HERE";
    
    const bbcode = `[img]https://i.imgur.com/om1IBgt.png[/img]
[lspdsubtitle]1. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none][b]1.1[/b] FULL NAME[/list]
[list=none][list=none]
[b]FIRST NAME:[/b] ${firstName}
[b]MIDDLE NAME:[/b] ${middleName}
[b]LAST NAME:[/b] ${lastName}
[/list][/list][/divbox]

[lspdsubtitle]2. DEPARTMENT EMPLOYMENT HISTORY[/lspdsubtitle]
[divbox=white][list=none][b]2.1[/b] PAST DEPARTMENT EMPLOYMENT INFORMATION[/list]
[list=none][list=none]
[b]FORMER RANK:[/b] ${formerRank}
[b]EMPLOYMENT END DATE:[/b] ${endDate}
[b]REASON:[/b] ${reason}
[b]DESIRED RANK:[/b] ${desiredRank}
[b]DESIRED ASSIGNMENT:[/b] ${desiredAssignment}
[/list][/list][/divbox]

[lspdsubtitle]3. GENERAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none][b]3.1[/b] OPEN QUESTIONS[/list]
[list=none][list=none]
[b]What have you done since your resignation or termination from the Los Santos Police Department?[/b]
[list=none]
${whatDone}
[/list]
[b]If you filed for resignation with the Los Santos Police Department, what was the reason behind doing so? If your employment was terminated, you may fill in N/A.[/b]
[list=none]
${resignationReason}
[/list]
[/list][/list][/divbox]

[lspdsubtitle]4. EMPLOYMENT DURING ABSENCE[/lspdsubtitle]
[divbox=white][list=none][b]4.1[/b] EMPLOYMENT AFTER RESIGNATION/TERMINATION[/list]
[list=none][list=none]
[b]COMPANY:[/b] ${company}
[b]POSITION:[/b] ${position}
[b]EMPLOYMENT END DATE:[/b] ${employmentEndDate}
[b]REASON:[/b] ${employmentReason}
[/list][/list][/divbox]

[lspdsubtitle](( 5. OUT-OF-CHARACTER INFORMATION ))[/lspdsubtitle]
[divbox=white][list=none][b]5.1[/b] OUT-OF-CHARACTER INFORMATION[/list]
[list=none][list=none]
[b]What have you done on Eclipse Roleplay following your departure from the Los Santos Police Department faction?[/b]
[list=none]
${oocDone}
[/list]
[b]Please provide a screenshot of your updated admin logs on the panel.[/b]
[list=none]
[url=${panelScreenshot}]Click Here[/url]
[/list]
[/list][/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('re_bbcodeOutput').textContent = bbcode;
    document.getElementById('re_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=125", "_blank");
    });
}

// Clear Reinstatement data
function clearReinstatementData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#reinstatement input[type='text'], #reinstatement textarea").forEach(el => el.value = "");
        document.getElementById("re_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Transfer BBCode
function generateTransferBBCode() {
    // Validate first
    const errors = validateTransfer();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const firstName = document.getElementById("tr_firstName").value || "Answer.";
    const middleName = document.getElementById("tr_middleName").value || "Answer.";
    const lastName = document.getElementById("tr_lastName").value || "Answer.";
    
    const currentRank = document.getElementById("tr_currentRank").value || "Answer.";
    const currentAssignment = document.getElementById("tr_currentAssignment").value || "Answer.";
    const qualifications = document.getElementById("tr_qualifications").value || "";
    const divisions = document.getElementById("tr_divisions").value || "";
    const awards = document.getElementById("tr_awards").value || "";
    
    const desiredRank = document.getElementById("tr_desiredRank").value || "Answer.";
    const desiredAssignment = document.getElementById("tr_desiredAssignment").value || "Answer.";
    
    const whyTransfer = document.getElementById("tr_whyTransfer").value || "Answer.";
    const whatAchieve = document.getElementById("tr_whatAchieve").value || "Answer.";
    const supervisoryTraining = document.getElementById("tr_supervisoryTraining").value || "Answer.";
    const disciplinaryAction = document.getElementById("tr_disciplinaryAction").value || "Answer.";
    
    const panelScreenshot = document.getElementById("tr_panelScreenshot").value || "SCREENSHOT LINK HERE";
    
    // Format lists
    const formatList = (text) => {
        if (!text) return "[*]Answer.\n[*]Answer.";
        const lines = text.split('\n').filter(line => line.trim());
        return lines.map(line => `[*]${line}`).join('\n');
    };
    
    const bbcode = `[img]https://i.imgur.com/WBGc8GZ.png[/img]
[lspdsubtitle]1. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none][b]1.1[/b] FULL NAME[/list]
[list=none][list=none]
[b]FIRST NAME:[/b] ${firstName}
[b]MIDDLE NAME:[/b] ${middleName}
[b]LAST NAME:[/b] ${lastName}
[/list][/list][/divbox]

[lspdsubtitle]2. DEPARTMENT EMPLOYMENT HISTORY[/lspdsubtitle]
[divbox=white][list=none][b]2.1[/b] SHERIFF'S DEPARTMENT EMPLOYMENT INFORMATION[/list]
[list=none][list=none]
[b]CURRENT RANK:[/b] ${currentRank}
[b]CURRENT ASSIGNMENT:[/b] ${currentAssignment}
[b]LIST ALL QUALIFICATIONS AND CERTIFICATIONS:[/b]
[list]
${formatList(qualifications)}
[/list]
[b]LIST ALL DIVISIONS:[/b]
[list]
${formatList(divisions)}
[/list]
[b]LIST ALL AWARDS AND COMMENDATIONS:[/b]
[list]
${formatList(awards)}
[/list][/list][/list]
[list=none][b]2.2[/b] POLICE DEPARTMENT EMPLOYMENT INFORMATION[/list][list=none]
[list=none]
[b]DESIRED RANK:[/b] ${desiredRank}
[b]DESIRED ASSIGNMENT:[/b] ${desiredAssignment}
[/list][/list][/divbox]

[lspdsubtitle]3. GENERAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none][b]3.1[/b] OPEN QUESTIONS[/list][list=none]
[list=none]
[b]Why do you wish to transfer to the Los Santos Police Department?[/b]
[list=none]
${whyTransfer}
[/list]
[b]What do you wish to achieve while employed with the Los Santos Police Department?[/b]
[list=none]
${whatAchieve}
[/list]
[b]Have you undergone any form of supervisory training with the Los Santos County Sheriff's Department? If so, how do you believe it would help your employment with the Los Santos Police Department?[/b]
[list=none]
${supervisoryTraining}
[/list]
[b]Have you received disciplinary action while employed with the Los Santos County Sheriff's Department? If so, please list and explain all disciplinary actions received.[/b]
[list=none]
${disciplinaryAction}
[/list]
[/list][/list][/divbox]

[lspdsubtitle](( 4. OUT-OF-CHARACTER INFORMATION ))[/lspdsubtitle]
[divbox=white][list=none][b]4.1[/b] OUT-OF-CHARACTER INFORMATION[/list]
[list=none][list=none]
[b]Please provide a screenshot of your updated admin logs on the panel.[/b]
[list=none]
[url=${panelScreenshot}]Click Here[/url]
[/list]
[/list][/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('tr_bbcodeOutput').textContent = bbcode;
    document.getElementById('tr_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=125", "_blank");
    });
}

// Clear Transfer data
function clearTransferData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#transfer input[type='text'], #transfer textarea").forEach(el => el.value = "");
        document.getElementById("tr_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Add/Remove Complaint Employees
function addComplaintEmployee() {
    const section = document.getElementById('complaintEmployeeSection');
    const count = section.getElementsByClassName('employee-group').length + 1;
    
    const newGroup = document.createElement('div');
    newGroup.classList.add('employee-group');
    newGroup.innerHTML = `
        <h4>Employee ${count}</h4>
        <div class="form-group">
            <label>FULL NAME: <span class="optional">(Optional)</span></label>
            <input type="text" name="co_empName[]" placeholder="Answer">
        </div>
        <div class="form-group">
            <label>RANK: <span class="optional">(Optional)</span></label>
            <input type="text" name="co_empRank[]" placeholder="Answer">
        </div>
        <div class="form-group">
            <label>BADGE NUMBER: <span class="optional">(Optional)</span></label>
            <input type="text" name="co_empBadge[]" placeholder="Answer">
        </div>
        <div class="form-group">
            <label>OTHER: <span class="optional">(Optional)</span></label>
            <input type="text" name="co_empOther[]" placeholder="Answer">
        </div>
    `;
    
    section.appendChild(newGroup);
    onDynamicContentAdded();
}

function removeComplaintEmployee() {
    const section = document.getElementById('complaintEmployeeSection');
    const groups = section.getElementsByClassName('employee-group');
    if (groups.length > 1) {
        section.removeChild(groups[groups.length - 1]);
    }
}

// Add/Remove Commendation Employees
function addCommendationEmployee() {
    const section = document.getElementById('commendationEmployeeSection');
    const count = section.getElementsByClassName('employee-group').length + 1;
    
    const newGroup = document.createElement('div');
    newGroup.classList.add('employee-group');
    newGroup.innerHTML = `
        <h4>Employee ${count}</h4>
        <div class="form-group">
            <label>FULL NAME: <span class="optional">(Optional)</span></label>
            <input type="text" name="cm_empName[]" placeholder="Answer">
        </div>
        <div class="form-group">
            <label>RANK: <span class="optional">(Optional)</span></label>
            <input type="text" name="cm_empRank[]" placeholder="Answer">
        </div>
        <div class="form-group">
            <label>BADGE NUMBER: <span class="optional">(Optional)</span></label>
            <input type="text" name="cm_empBadge[]" placeholder="Answer">
        </div>
        <div class="form-group">
            <label>OTHER: <span class="optional">(Optional)</span></label>
            <input type="text" name="cm_empOther[]" placeholder="Answer">
        </div>
    `;
    
    section.appendChild(newGroup);
    onDynamicContentAdded();
}

function removeCommendationEmployee() {
    const section = document.getElementById('commendationEmployeeSection');
    const groups = section.getElementsByClassName('employee-group');
    if (groups.length > 1) {
        section.removeChild(groups[groups.length - 1]);
    }
}

// Generate Complaint BBCode
function generateComplaintBBCode() {
    // Validate first
    const errors = validateComplaint();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("co_fullName").value || "Answer";
    const phone = document.getElementById("co_phone").value || "Answer";
    const address = document.getElementById("co_address").value || "Answer";
    const other = document.getElementById("co_other").value || "N/A";
    
    const incidentDate = document.getElementById("co_incidentDate").value || "Answer";
    const incidentTime = document.getElementById("co_incidentTime").value || "Answer";
    const incidentLocation = document.getElementById("co_incidentLocation").value || "Answer";
    const incidentDescription = document.getElementById("co_incidentDescription").value || "Answer";
    const evidence = document.getElementById("co_evidence").value || "N/A";
    
    // Collect employee data
    let employeeSection = "";
    const empNames = document.getElementsByName("co_empName[]");
    const empRanks = document.getElementsByName("co_empRank[]");
    const empBadges = document.getElementsByName("co_empBadge[]");
    const empOthers = document.getElementsByName("co_empOther[]");
    
    for (let i = 0; i < empNames.length; i++) {
        const name = empNames[i].value || "N/A";
        const rank = empRanks[i].value || "N/A";
        const badge = empBadges[i].value || "N/A";
        const otherInfo = empOthers[i].value || "N/A";
        
        employeeSection += `
[b]FULL NAME:[/b] ${name}
[b]RANK:[/b] ${rank}
[b]BADGE NUMBER:[/b] ${badge}
[b]OTHER:[/b] ${otherInfo}`;
        
        if (i < empNames.length - 1) {
            employeeSection += "\n";
        }
    }
    
    const bbcode = `[img]https://i.imgur.com/OJa1ybs.png[/img]
[lspdsubtitle]1. YOUR INFORMATION[/lspdsubtitle]
[divbox=white]
[list=none]
[b]FULL NAME:[/b] ${fullName}
[b]PHONE:[/b] ${phone}
[b]ADDRESS:[/b] ${address}
[b]OTHER:[/b] ${other}
[/list]
[/divbox]

[lspdsubtitle]2. EMPLOYEE(S) DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]${employeeSection}
[/list]
[/divbox]

[lspdsubtitle]3. INCIDENT DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]DATE OF THE INCIDENT:[/b] ${incidentDate}
[b]TIME OF THE INCIDENT:[/b] ${incidentTime}
[b]LOCATION OF THE INCIDENT:[/b] ${incidentLocation}
[b]DESCRIPTION OF THE INCIDENT:[/b][list=none]
${incidentDescription}${evidence ? `
[b]Evidence (Not mandatory, but encouraged):[/b]
${evidence}` : ''}
[/list][/list][/divbox][lspdfooter]`;
    
    document.getElementById('co_bbcodeOutput').textContent = bbcode;
    document.getElementById('co_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1532", "_blank");
    });
}

// Clear Complaint data
function clearComplaintData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#complaint input[type='text'], #complaint textarea").forEach(el => el.value = "");
        
        // Reset to one employee group
        const section = document.getElementById('complaintEmployeeSection');
        section.innerHTML = `
            <div class="employee-group">
                <h4>Employee 1</h4>
                <div class="form-group">
                    <label>FULL NAME: <span class="optional">(Optional)</span></label>
                    <input type="text" name="co_empName[]" placeholder="Answer">
                </div>
                <div class="form-group">
                    <label>RANK: <span class="optional">(Optional)</span></label>
                    <input type="text" name="co_empRank[]" placeholder="Answer">
                </div>
                <div class="form-group">
                    <label>BADGE NUMBER: <span class="optional">(Optional)</span></label>
                    <input type="text" name="co_empBadge[]" placeholder="Answer">
                </div>
                <div class="form-group">
                    <label>OTHER: <span class="optional">(Optional)</span></label>
                    <input type="text" name="co_empOther[]" placeholder="Answer">
                </div>
            </div>
        `;
        
        document.getElementById("co_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Commendation BBCode
function generateCommendationBBCode() {
    // Validate first
    const errors = validateCommendation();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("cm_fullName").value || "Answer";
    const phone = document.getElementById("cm_phone").value || "Answer";
    const address = document.getElementById("cm_address").value || "Answer";
    const other = document.getElementById("cm_other").value || "N/A";
    
    const incidentDate = document.getElementById("cm_incidentDate").value || "Answer";
    const incidentTime = document.getElementById("cm_incidentTime").value || "Answer";
    const incidentLocation = document.getElementById("cm_incidentLocation").value || "Answer";
    const description = document.getElementById("cm_description").value || "Answer";
    
    // Collect employee data
    let employeeSection = "";
    const empNames = document.getElementsByName("cm_empName[]");
    const empRanks = document.getElementsByName("cm_empRank[]");
    const empBadges = document.getElementsByName("cm_empBadge[]");
    const empOthers = document.getElementsByName("cm_empOther[]");
    
    for (let i = 0; i < empNames.length; i++) {
        const name = empNames[i].value || "N/A";
        const rank = empRanks[i].value || "N/A";
        const badge = empBadges[i].value || "N/A";
        const otherInfo = empOthers[i].value || "N/A";
        
        employeeSection += `
[b]FULL NAME:[/b] ${name}
[b]RANK:[/b] ${rank}
[b]BADGE NUMBER:[/b] ${badge}
[b]OTHER:[/b] ${otherInfo}`;
        
        if (i < empNames.length - 1) {
            employeeSection += "\n";
        }
    }
    
    const bbcode = `[img]https://i.imgur.com/mKB8Kdw.png[/img]
[lspdsubtitle]1. YOUR INFORMATION[/lspdsubtitle]
[divbox=white]
[list=none]
[b]FULL NAME:[/b] ${fullName}
[b]PHONE:[/b] ${phone}
[b]ADDRESS:[/b] ${address}
[b]OTHER:[/b] ${other}
[/list]
[/divbox]

[lspdsubtitle]2. EMPLOYEE(S) DETAILS[/lspdsubtitle]
[divbox=white]
[list=none]${employeeSection}
[/list]
[/divbox]

[lspdsubtitle]3. INCIDENT DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]DATE OF THE INCIDENT:[/b] ${incidentDate}
[b]TIME OF THE INCIDENT:[/b] ${incidentTime}
[b]LOCATION OF THE INCIDENT:[/b] ${incidentLocation}
[b]DESCRIPTION OF THE COMMENDATION:[/b][list=none]
${description}
[/list][/list][/divbox][lspdfooter]`;
    
    document.getElementById('cm_bbcodeOutput').textContent = bbcode;
    document.getElementById('cm_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1532", "_blank");
    });
}

// Clear Commendation data
function clearCommendationData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#commendation input[type='text'], #commendation textarea").forEach(el => el.value = "");
        
        // Reset to one employee group
        const section = document.getElementById('commendationEmployeeSection');
        section.innerHTML = `
            <div class="employee-group">
                <h4>Employee 1</h4>
                <div class="form-group">
                    <label>FULL NAME: <span class="optional">(Optional)</span></label>
                    <input type="text" name="cm_empName[]" placeholder="Answer">
                </div>
                <div class="form-group">
                    <label>RANK: <span class="optional">(Optional)</span></label>
                    <input type="text" name="cm_empRank[]" placeholder="Answer">
                </div>
                <div class="form-group">
                    <label>BADGE NUMBER: <span class="optional">(Optional)</span></label>
                    <input type="text" name="cm_empBadge[]" placeholder="Answer">
                </div>
                <div class="form-group">
                    <label>OTHER: <span class="optional">(Optional)</span></label>
                    <input type="text" name="cm_empOther[]" placeholder="Answer">
                </div>
            </div>
        `;
        
        document.getElementById("cm_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Add/Remove Roleplay Feedback Points
function addRfLspdPoint() {
    const container = document.getElementById('rf_lspdPointsContainer');
    const count = container.querySelectorAll('input').length + 1;
    
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'rf_lspdPoints[]';
    newInput.placeholder = `Item ${count}`;
    newInput.style.marginBottom = '8px';
    newInput.required = true;
    
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeRfLspdPoint() {
    const container = document.getElementById('rf_lspdPointsContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 3) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function addRfPlayerPoint() {
    const container = document.getElementById('rf_playerPointsContainer');
    const count = container.querySelectorAll('input').length + 1;
    
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'rf_playerPoints[]';
    newInput.placeholder = `Item ${count}`;
    newInput.style.marginBottom = '8px';
    newInput.required = true;
    
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeRfPlayerPoint() {
    const container = document.getElementById('rf_playerPointsContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 3) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

// Generate Roleplay Feedback BBCode
function generateRoleplayFeedbackBBCode() {
    // Validate first
    const errors = validateRoleplayFeedback();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const playerName = document.getElementById("rf_playerName").value || "ANSWER HERE";
    const lspdMembers = document.getElementById("rf_lspdMembers").value || "ANSWER HERE";
    const dateTime = document.getElementById("rf_dateTime").value || "DD/MMM/YYYY - TIME";
    const description = document.getElementById("rf_description").value || "ANSWER HERE";
    const differently = document.getElementById("rf_differently").value || "ANSWER HERE";
    const accomplish = document.getElementById("rf_accomplish").value || "ANSWER HERE";
    
    // Collect LSPD points
    let lspdPointsList = "";
    const lspdPoints = document.getElementsByName("rf_lspdPoints[]");
    for (let i = 0; i < lspdPoints.length; i++) {
        if (lspdPoints[i].value.trim()) {
            lspdPointsList += `[*]${lspdPoints[i].value}\n`;
        }
    }
    
    // Collect player points
    let playerPointsList = "";
    const playerPoints = document.getElementsByName("rf_playerPoints[]");
    for (let i = 0; i < playerPoints.length; i++) {
        if (playerPoints[i].value.trim()) {
            playerPointsList += `[*]${playerPoints[i].value}\n`;
        }
    }
    
    const bbcode = `[img]https://i.imgur.com/bkLKMPd.png[/img]
[lspdsubtitle]Roleplay Feedback[/lspdsubtitle]
[divbox=white]
[b]1. What's your player name?[/b]
${playerName}

[b]2. Do you know any names of LSPD members involved in your situation?[/b]
${lspdMembers}

[b]3. When did this situation occur?[/b]
${dateTime}

[b]4. Can you list down at least three good or bad things from our side in this situation?[/b]
[list=1]${lspdPointsList}[/list]
[b]5. Can you list down at least three good or bad things from your side in this situation?[/b]
[list=1]${playerPointsList}[/list]
[b]6. Can you provide an accurate description of the events that unfolded? (add any footage you may have to back any claims up)[/b]
${description}

[b]7. What would you have done differently from both the perspective of PD and your own?[/b]
${differently}

[b]8. What are you hoping to accomplish by sending this feedback to us?[/b]
${accomplish}
[/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('rf_bbcodeOutput').textContent = bbcode;
    document.getElementById('rf_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=4018", "_blank");
    });
}

// Clear Roleplay Feedback data
function clearRoleplayFeedbackData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#roleplay-feedback input[type='text'], #roleplay-feedback textarea").forEach(el => el.value = "");
        
        // Reset to three items for each list
        const lspdContainer = document.getElementById('rf_lspdPointsContainer');
        lspdContainer.innerHTML = `
            <input type="text" name="rf_lspdPoints[]" placeholder="Item 1" style="margin-bottom: 8px;" required>
            <input type="text" name="rf_lspdPoints[]" placeholder="Item 2" style="margin-bottom: 8px;" required>
            <input type="text" name="rf_lspdPoints[]" placeholder="Item 3" style="margin-bottom: 8px;" required>
        `;
        
        const playerContainer = document.getElementById('rf_playerPointsContainer');
        playerContainer.innerHTML = `
            <input type="text" name="rf_playerPoints[]" placeholder="Item 1" style="margin-bottom: 8px;" required>
            <input type="text" name="rf_playerPoints[]" placeholder="Item 2" style="margin-bottom: 8px;" required>
            <input type="text" name="rf_playerPoints[]" placeholder="Item 3" style="margin-bottom: 8px;" required>
        `;
        
        document.getElementById("rf_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Press Inquiries BBCode
function generatePressInquiriesBBCode() {
    // Validate first
    const errors = validatePressInquiries();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("pi_fullName").value || "Answer.";
    const phoneNumber = document.getElementById("pi_phoneNumber").value || "Answer.";
    const email = document.getElementById("pi_email").value || "Answer.";
    const position = document.getElementById("pi_position").value || "Answer.";
    const requestDetails = document.getElementById("pi_requestDetails").value || "Answer here. Include as much information as you can.";
    
    const bbcode = `[img]https://i.imgur.com/amVoISR.png[/img]
[lspdsubtitle]1. CONTACT INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]Full Name:[/b] ${fullName}
[b]Phone Number:[/b] ${phoneNumber}
[b]E-Mail Address:[/b] ${email}
[b]Position in Agency:[/b] ${position}
[/list][/divbox]

[lspdsubtitle]2. REQUEST INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]Detailed information of your request:[/b][list=none]
${requestDetails}
[/list][/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('pi_bbcodeOutput').textContent = bbcode;
    document.getElementById('pi_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1705", "_blank");
    });
}

// Clear Press Inquiries data
function clearPressInquiriesData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#press-inquiries input[type='text'], #press-inquiries textarea").forEach(el => el.value = "");
        document.getElementById("pi_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Public Inquiries BBCode
function generatePublicInquiriesBBCode() {
    // Validate first
    const errors = validatePublicInquiries();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("pui_fullName").value || "Answer.";
    const phoneNumber = document.getElementById("pui_phoneNumber").value || "Answer.";
    const email = document.getElementById("pui_email").value || "Answer.";
    const position = document.getElementById("pui_position").value || "N/A";
    const requestDetails = document.getElementById("pui_requestDetails").value || "Answer here. Include as much information as you can.";
    
    const bbcode = `[img]https://i.imgur.com/amVoISR.png[/img]
[lspdsubtitle]1. CONTACT INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]Full Name:[/b] ${fullName}
[b]Phone Number:[/b] ${phoneNumber}
[b]E-Mail Address:[/b] ${email}
[b]Position in Institution (If Applicable):[/b] ${position}
[/list][/divbox]

[lspdsubtitle]2. REQUEST INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]Detailed information of your request:[/b][list=none]
${requestDetails}
[/list][/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('pui_bbcodeOutput').textContent = bbcode;
    document.getElementById('pui_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=1705", "_blank");
    });
}

// Clear Public Inquiries data
function clearPublicInquiriesData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#public-inquiries input[type='text'], #public-inquiries textarea").forEach(el => el.value = "");
        document.getElementById("pui_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Generate Press Passes BBCode
function generatePressPassesBBCode() {
    // Validate first
    const errors = validatePressPasses();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("pp_fullName").value || "Firstname Lastname";
    const dateOfBirth = formatDate(document.getElementById("pp_dateOfBirth").value) || "DD/MON/YYYY";
    const phoneNumber = document.getElementById("pp_phoneNumber").value || "####";
    const residentialAddress = document.getElementById("pp_residentialAddress").value || "Answer";
    
    const employer = document.getElementById("pp_employer").value || "Answer";
    const position = document.getElementById("pp_position").value || "Answer";
    const businessAddress = document.getElementById("pp_businessAddress").value || "Answer";
    const jobDuties = document.getElementById("pp_jobDuties").value || "Answer Here";
    
    const passportPhoto = document.getElementById("pp_passportPhoto").value || "PASTE LINK HERE";
    const proofOfId = document.getElementById("pp_proofOfId").value || "PASTE LINK HERE";
    const proofOfEmployment = document.getElementById("pp_proofOfEmployment").value || "PASTE LINK HERE";
    const letterhead = document.getElementById("pp_letterhead").value || "PASTE LINK HERE";
    
    const signature = document.getElementById("pp_signature").value || "Firstname Lastname";
    const dateSigned = formatDate(document.getElementById("pp_dateSigned").value) || "DD/MON/YYYY";
    
    const bbcode = `[img]https://i.imgur.com/Xt3vxAZ.png[/img]
[lspdsubtitle]1. PERSONAL DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]1.1 Full Name:[/b] ${fullName}
[b]1.2 Date of Birth:[/b] ${dateOfBirth}
[b]1.3 Phone Number:[/b] ${phoneNumber}
[b]1.4 Residential Address:[/b] ${residentialAddress}
[/list][/divbox]

[lspdsubtitle]2. EMPLOYMENT DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]2.1 Employer:[/b] ${employer}
[b]2.2 Position/Job Title:[/b] ${position}
[b]2.3 Business Address:[/b] ${businessAddress}
[b]2.4 Provide a description of your job duties as it applies to the need for an LSPD media card:[/b]
[list=none]
${jobDuties}
[/list]
[/list][/divbox]

[lspdsubtitle]3. FORM ATTACHMENTS[/lspdsubtitle]
[divbox=white][list=none]
[b]3.1 Provide a passport photograph ([url=https://i.imgur.com/aXycPgQ.png]press here for an example[/url]):[/b]
[size=85]Your photo should have the front of your face and your shoulders visible. The photograph [u]SHOULD NOT[/u] include hats, glasses, or any facial obstruction.[/size]
[list=none]
[url=${passportPhoto}] ATTACHED DOCUMENT - PASSPORT PHOTO [/url]
[/list]
[b]3.2 Proof of Identification ([url=https://i.imgur.com/ooTEaT8.png]press here for an example[/url]):[/b]
[list=none]
[url=${proofOfId}] ATTACHED DOCUMENT - PROOF OF IDENTIFICATION [/url]
[/list]
[b]3.3 Proof of Employment ([url=https://i.imgur.com/NMxHJpt.png]press here for an example[/url]):[/b]
[list=none]
[url=${proofOfEmployment}] ATTACHED DOCUMENT - PROOF OF EMPLOYMENT [/url]
[/list]
[b]3.4 Provide a letter on original business letterhead, signed by the news director, editor, or person in charge, stating that the applicant is an employee of the news organization and an employee who regularly covers news events involving police operations in the City of Los Santos ([url=https://i.imgur.com/yd69iz0.png]presss here for an example[/url]):[/b]
[list=none]
[url=${letterhead}] ATTACHED DOCUMENT - LETTER [/url]
[/list]
[/list][/divbox]

[lspdsubtitle]4. AGREEMENT[/lspdsubtitle]
[divbox=white]
[divbox=#ffffde]I, the undersigned, hereby certify that I have carefully read the information submitted on this application and that it is true and complete. I understand any false information or withholding of information is grounds for the denial or revocation of my LSPD News Media Identification Card. I understand and agree to abide by all guidelines and information established in the Press Pass Policy informational topic. I hereby release and agree to hold harmless the State of San Andreas, the Los Santos Police Department, their employees, from any and all liability for any loss of life, bodily injury, property damage, or any claim whatsoever, which I may sustain while riding in or upon said motor vehicles and which I may receive while accompanying an officer of the Los Santos Police Department, regardless of the cause of such damage or injury, whether through negligence or otherwise. I agree to assume all risks in riding in Los Santos Police Department's motor vehicles and in accompanying its officers and I am fully aware that personal danger may be involved. I further promise that I have read and fully understand all ride-along regulations.[/divbox][list=none]
[b]4.1 Signature:[/b] [i][font=Bradley Hand ITC] ${signature} [/font][/i]
[b]4.2 Date Signed:[/b] ${dateSigned}
[/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('pp_bbcodeOutput').textContent = bbcode;
    document.getElementById('pp_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=2403", "_blank");
    });
}

// Clear Press Passes data
function clearPressPassesData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#press-passes input[type='text'], #press-passes textarea").forEach(el => el.value = "");
        document.querySelectorAll("#press-passes input[type='date']").forEach(el => el.value = "");
        document.getElementById("pp_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

function generateSelfBackgroundCheckBBCode() {
    // Validate first
    const errors = validateSelfBackgroundCheck();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("sbc_fullName").value || "Fname Lname";
    const phoneNumber = document.getElementById("sbc_phoneNumber").value || "0000000";
    const govLicense = document.getElementById("sbc_govLicense").value || "YOUR-LINK-HERE";
    const passportPhoto = document.getElementById("sbc_passportPhoto").value || "YOUR-LINK-HERE";
    
    // Timeframe
    const oneWeek = document.querySelector('input[name="sbc_timeframe"][value="oneWeek"]')?.checked ? "[cbc]" : "[cb]";
    const twoWeeks = document.querySelector('input[name="sbc_timeframe"][value="twoWeeks"]')?.checked ? "[cbc]" : "[cb]";
    const threeWeeks = document.querySelector('input[name="sbc_timeframe"][value="threeWeeks"]')?.checked ? "[cbc]" : "[cb]";
    
    // Offenses
    const citations = document.getElementById("sbc_citations").checked ? "[cbc]" : "[cb]";
    const misdemeanors = document.getElementById("sbc_misdemeanors").checked ? "[cbc]" : "[cb]";
    const felonies = document.getElementById("sbc_felonies").checked ? "[cbc]" : "[cb]";
    
    const signature = document.getElementById("sbc_signature").value || "Fname Lname";
    const dateSigned = formatDate(document.getElementById("sbc_dateSigned").value) || "DD/MMM/YYYY";
    
    const bbcode = `[img]https://i.imgur.com/NdB9qBr.png[/img]
[lspdsubtitle]A. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]A.1 - Full Name:[/b]
[list=none]
${fullName}
[/list]
[b]A.2 - Phone Number:[/b]
[list=none]
${phoneNumber}
[/list]
[b]A.3 - Gov. License ([url=https://imgur.com/3VOTXMg]Example[/url])[/b]:
[list=none]
[url=${govLicense}]ATTACHED DOCUMENT[/url]
[/list]
[b]A.4 - Passport Photo ([url=https://imgur.com/aXycPgQ]Example[/url])[/b]:
Photo should be of the front of your face, with your shoulders visible. No hats, glasses or any facial obstruction are permitted.
[list=none]
[url=${passportPhoto}]ATTACHED DOCUMENT[/url]
[/list]
[/list][/divbox]

[lspdsubtitle]B. REQUEST OPTIONS[/lspdsubtitle]
[divbox=white][list=none]
[b]B.1 - Timeframe:[/b]
[size=90][c]Mark only one box by changing [cb] to [cbc] [/c][/size][list=none]
${oneWeek}One week
${twoWeeks}Two weeks
${threeWeeks}Three weeks
[/list]
[b]B.2 - Relevant Offenses:[/b]
[size=90][c]Mark up to three boxes by changing [cb] to [cbc] [/c][/size][list=none]
${citations}Citations
${misdemeanors}Misdemeanors
${felonies}Felonies
[/list]
[/list][/divbox]

[lspdsubtitle]C. ACKNOWLEDGEMENT[/lspdsubtitle]
[divbox=white][list=none]
I, the undersigned, affirm under penalty of forgery, that all information provided above is accurate, to the best of my knowledge, and has not been on filed on behalf of another person, entity or organization.

[b]C1. Signature:[/b] ${signature}
[b]C2. Date Signed:[/b] ${dateSigned}
[/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('sbc_bbcodeOutput').textContent = bbcode;
    document.getElementById('sbc_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=4094", "_blank");
    });
}

function clearSelfBackgroundCheckData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#self-background-check input[type='text']").forEach(el => el.value = "");
        document.querySelectorAll("#self-background-check input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#self-background-check input[type='radio']").forEach(el => el.checked = false);
        document.querySelectorAll("#self-background-check input[type='checkbox']").forEach(el => el.checked = false);
        document.getElementById("sbc_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Company Background Check Functions
function addCbcEmployee() {
    const container = document.getElementById('cbc_employeesContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'cbc_employees[]';
    newInput.placeholder = 'Fname Lname';
    newInput.style.marginBottom = '8px';
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeCbcEmployee() {
    const container = document.getElementById('cbc_employeesContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function addCbcProspective() {
    const container = document.getElementById('cbc_prospectiveContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'cbc_prospective[]';
    newInput.placeholder = 'Fname Lname';
    newInput.style.marginBottom = '8px';
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeCbcProspective() {
    const container = document.getElementById('cbc_prospectiveContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function generateCompanyBackgroundCheckBBCode() {
    // Validate first
    const errors = validateCompanyBackgroundCheck();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("cbc_fullName").value || "Fname Lname";
    const phoneNumber = document.getElementById("cbc_phoneNumber").value || "0000000";
    const govLicense = document.getElementById("cbc_govLicense").value || "YOUR-LINK-HERE";
    const hrBadge = document.getElementById("cbc_hrBadge").value || "YOUR-LINK-HERE";
    
    // Collect employees
    let employeesList = "";
    const employees = document.getElementsByName("cbc_employees[]");
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].value.trim()) {
            employeesList += `[*]${employees[i].value}\n`;
        }
    }
    if (!employeesList) employeesList = "[*]Fname Lname\n[*]Fname Lname\n[*]Fname Lname\n";
    
    // Collect prospective employees
    let prospectiveList = "";
    const prospectives = document.getElementsByName("cbc_prospective[]");
    for (let i = 0; i < prospectives.length; i++) {
        if (prospectives[i].value.trim()) {
            prospectiveList += `[*]${prospectives[i].value}\n`;
        }
    }
    if (!prospectiveList) prospectiveList = "[*]Fname Lname\n[*]Fname Lname\n[*]Fname Lname\n";
    
    // Timeframe
    const oneWeek = document.querySelector('input[name="cbc_timeframe"][value="oneWeek"]')?.checked ? "[cbc]" : "[cb]";
    const twoWeeks = document.querySelector('input[name="cbc_timeframe"][value="twoWeeks"]')?.checked ? "[cbc]" : "[cb]";
    const threeWeeks = document.querySelector('input[name="cbc_timeframe"][value="threeWeeks"]')?.checked ? "[cbc]" : "[cb]";
    
    // Offenses
    const citations = document.getElementById("cbc_citations").checked ? "[cbc]" : "[cb]";
    const misdemeanors = document.getElementById("cbc_misdemeanors").checked ? "[cbc]" : "[cb]";
    const felonies = document.getElementById("cbc_felonies").checked ? "[cbc]" : "[cb]";
    
    const signature = document.getElementById("cbc_signature").value || "Fname Lname";
    const dateSigned = formatDate(document.getElementById("cbc_dateSigned").value) || "DD/MMM/YYYY";
    
    const bbcode = `[img]https://i.imgur.com/JvXjFfc.png[/img]
[lspdsubtitle]A. PERSONAL INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]A.1 - Full Name:[/b]
[list=none]
${fullName}
[/list]
[b]A.2 - Phone Number:[/b]
[list=none]
${phoneNumber}
[/list]
[b]A.3 - Gov. License ([url=https://imgur.com/3VOTXMg]Example[/url])[/b]:
[list=none]
[url=${govLicense}]ATTACHED DOCUMENT[/url]
[/list]
[b]A.4 - HR Badge ([url=PENDING]Example[/url])[/b]:
[list=none]
[url=${hrBadge}]ATTACHED DOCUMENT[/url]
[/list]
[/list][/divbox]

[lspdsubtitle]B. PERSONS FOR CHECK[/lspdsubtitle]
[divbox=white][list=none]
You may add additional entries for persons as required.

[b]Employees[/b] individual(s) currently employed by your company.
[list]
${employeesList}[/list]
[b]Prospective Employees[/b] individual(s) seeking employment with your company.
[list]
${prospectiveList}[/list]
[/list][/divbox]

[lspdsubtitle]C. REQUEST OPTIONS[/lspdsubtitle]
[divbox=white][list=none]
Please be mindful of our staff's time and only mark the required checkboxes for the performance of your duties; for example, if no amount of citations can affect employment, do not mark the citation box.

[b]B.1 - Timeframe:[/b]
[size=90][c]Mark only one box by changing [cb] to [cbc] [/c][/size][list=none]
${oneWeek}One week
${twoWeeks}Two weeks
${threeWeeks}Three weeks
[/list]
[b]B.2 - Relevant Offenses:[/b]
[size=90][c]Mark up to three boxes by changing [cb] to [cbc] [/c][/size][list=none]
${citations}Citations
${misdemeanors}Misdemeanors
${felonies}Felonies
[/list]
[/list][/divbox]

[lspdsubtitle]D. ACKNOWLEDGEMENT[/lspdsubtitle]
[divbox=white][list=none]
I, the undersigned, affirm under penalty of forgery, that all information provided above is accurate, to the best of my knowledge. I affirm that my employer is aware of me submitting this request, and allows it as per internal guidelines or direct order. I affirm that all of the individuals listed in section B are aware that a background check is being performed on them, and that they have consented to this.

[b]C1. Signature:[/b] ${signature}
[b]C2. Date Signed:[/b] ${dateSigned}
[/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('cbc_bbcodeOutput').textContent = bbcode;
    document.getElementById('cbc_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=4094", "_blank");
    });
}

function clearCompanyBackgroundCheckData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#company-background-check input[type='text']").forEach(el => el.value = "");
        document.querySelectorAll("#company-background-check input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#company-background-check input[type='radio']").forEach(el => el.checked = false);
        document.querySelectorAll("#company-background-check input[type='checkbox']").forEach(el => el.checked = false);
        
        // Reset employee lists
        document.getElementById('cbc_employeesContainer').innerHTML = `
            <input type="text" name="cbc_employees[]" placeholder="Fname Lname" style="margin-bottom: 8px;">
            <input type="text" name="cbc_employees[]" placeholder="Fname Lname" style="margin-bottom: 8px;">
            <input type="text" name="cbc_employees[]" placeholder="Fname Lname" style="margin-bottom: 8px;">
        `;
        
        document.getElementById('cbc_prospectiveContainer').innerHTML = `
            <input type="text" name="cbc_prospective[]" placeholder="Fname Lname" style="margin-bottom: 8px;">
            <input type="text" name="cbc_prospective[]" placeholder="Fname Lname" style="margin-bottom: 8px;">
            <input type="text" name="cbc_prospective[]" placeholder="Fname Lname" style="margin-bottom: 8px;">
        `;
        
        document.getElementById("cbc_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

function generateReportCrimeBBCode() {
    // Validate first
    const errors = validateReportCrime();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const yourName = document.getElementById("rc_yourName").value || "First Last";
    const yourPhone = document.getElementById("rc_yourPhone").value || "0000000";
    const dateOfIncident = document.getElementById("rc_dateOfIncident").value || "DD/MMM/YYYY";
    const locationOfIncident = document.getElementById("rc_locationOfIncident").value || "Answer";
    const description = document.getElementById("rc_description").value || "ANSWER HERE";
    
    const bbcode = `[img]https://i.imgur.com/gJTtgVi.png[/img]
[lspdsubtitle]INCIDENT INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]YOUR NAME:[/b] ${yourName}
[b]YOUR PHONE:[/b] ${yourPhone}
[b]DATE OF THE INCIDENT:[/b] ${dateOfIncident}
[b]LOCATION OF THE INCIDENT:[/b] ${locationOfIncident}
[b]DESCRIPTION OF THE INCIDENT:[/b]
${description}

[ooc]
If you add video/pictures to use as evidence we require [u]as per the server rules[/u] to see evidence of you roleplaying it in-character. Example: [url=https://i.imgur.com/6fNzARM.png]like this[/url]; without that, we can not use your evidence.
[/ooc]
[/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('rc_bbcodeOutput').textContent = bbcode;
    document.getElementById('rc_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=23", "_blank");
    });
}

function clearReportCrimeData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#report-crime input[type='text'], #report-crime textarea").forEach(el => el.value = "");
        document.getElementById("rc_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Bounty Report Functions
function addBrProperty() {
    const container = document.getElementById('br_propertyContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'br_property[]';
    newInput.placeholder = '# StreetName';
    newInput.style.marginBottom = '8px';
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeBrProperty() {
    const container = document.getElementById('br_propertyContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function addBrAffiliation() {
    const container = document.getElementById('br_affiliationsContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'br_affiliations[]';
    newInput.placeholder = 'CRIMINAL ORGANIZATION OR GANG NAME';
    newInput.style.marginBottom = '8px';
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeBrAffiliation() {
    const container = document.getElementById('br_affiliationsContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function addBrSuspect() {
    const container = document.getElementById('br_suspectsContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'br_suspects[]';
    newInput.placeholder = 'Firstname Lastname - Description';
    newInput.style.marginBottom = '8px';
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeBrSuspect() {
    const container = document.getElementById('br_suspectsContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function addBrVehicle() {
    const container = document.getElementById('br_vehiclesContainer');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'br_vehicles[]';
    newInput.placeholder = 'Model, Color, Plate, Other Details';
    newInput.style.marginBottom = '8px';
    container.appendChild(newInput);
    onDynamicContentAdded();
}

function removeBrVehicle() {
    const container = document.getElementById('br_vehiclesContainer');
    const inputs = container.querySelectorAll('input');
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    }
}

function addBrMedia() {
    const container = document.getElementById('br_mediaContainer');
    const newRow = document.createElement('div');
    newRow.className = 'media-row';
    newRow.style.display = 'flex';
    newRow.style.gap = '8px';
    newRow.style.marginBottom = '8px';
    newRow.innerHTML = `
        <input type="text" name="br_mediaLink[]" placeholder="LINK HERE" style="flex: 1;">
        <input type="text" name="br_mediaDesc[]" placeholder="Description of Provided Media" style="flex: 2;">
    `;
    container.appendChild(newRow);
    onDynamicContentAdded();
}

function removeBrMedia() {
    const container = document.getElementById('br_mediaContainer');
    const rows = container.querySelectorAll('.media-row');
    if (rows.length > 1) {
        container.removeChild(rows[rows.length - 1]);
    }
}

function generateBountyReportBBCode() {
    // Validate first
    const errors = validateBountyReport();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("br_fullName").value || "Answer";
    const phone = document.getElementById("br_phone").value || "Answer";
    const address = document.getElementById("br_address").value || "Answer";
    const other = document.getElementById("br_other").value || "N/A";
    const stashDescription = document.getElementById("br_stashDescription").value || "Answer";
    const signature = document.getElementById("br_signature").value || "Firstname Lastname";
    const dateSigned = formatDate(document.getElementById("br_dateSigned").value) || "DD/MON/YYYY";
    
    // Collect properties
    let propertiesList = "";
    const properties = document.getElementsByName("br_property[]");
    for (let i = 0; i < properties.length; i++) {
        if (properties[i].value.trim()) {
            propertiesList += `[*]${properties[i].value}\n`;
        }
    }
    
    // Collect affiliations
    let affiliationsList = "";
    const affiliations = document.getElementsByName("br_affiliations[]");
    for (let i = 0; i < affiliations.length; i++) {
        if (affiliations[i].value.trim()) {
            affiliationsList += `[*]${affiliations[i].value}\n`;
        }
    }
    if (!affiliationsList) affiliationsList = "[*]N/A\n[*]N/A\n";
    
    // Collect suspects
    let suspectsList = "";
    const suspects = document.getElementsByName("br_suspects[]");
    for (let i = 0; i < suspects.length; i++) {
        if (suspects[i].value.trim()) {
            suspectsList += `[*]${suspects[i].value}\n`;
        }
    }
    if (!suspectsList) suspectsList = "[*]N/A\n[*]N/A\n";
    
    // Collect vehicles
    let vehiclesList = "";
    const vehicles = document.getElementsByName("br_vehicles[]");
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].value.trim()) {
            vehiclesList += `[*]${vehicles[i].value}\n`;
        }
    }
    if (!vehiclesList) vehiclesList = "[*]N/A\n[*]N/A\n";
    
    // Collect media
    let mediaList = "";
    const mediaLinks = document.getElementsByName("br_mediaLink[]");
    const mediaDescs = document.getElementsByName("br_mediaDesc[]");
    for (let i = 0; i < mediaLinks.length; i++) {
        if (mediaLinks[i].value.trim() && mediaDescs[i].value.trim()) {
            mediaList += `[*][url=${mediaLinks[i].value}]${mediaDescs[i].value}[/url]\n`;
        }
    }
    if (!mediaList) mediaList = "[*][url=]N/A[/url]\n[*][url=]N/A[/url]\n";
    
    const bbcode = `[img]https://i.imgur.com/mqT3qot.png[/img]
[lspdsubtitle]1. YOUR INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]FULL NAME:[/b] ${fullName}
[b]PHONE:[/b] ${phone}
[b]ADDRESS:[/b] ${address}
[b]OTHER:[/b] ${other}
[/list][/divbox]

[lspdsubtitle]2. STASH HOUSE INFORMATION[/lspdsubtitle]
[divbox=white][list=none]
[b]DESCRIPTION OF THE STASH HOUSE:[/b][list=none]
[b]PROPERTY:[/b] [ooc] Please provide in the /setgps format. [/ooc][list]
${propertiesList}[/list]
${stashDescription}
[/list][/divbox]

[lspdsubtitle]3. EVIDENCE AND DESCRIPTIONS[/lspdsubtitle]
[divbox=white][list=none]
[b]AFFILIATIONS:[/b]
[list]
${affiliationsList}[/list]
[b]SUSPECT(S):[/b][list]
${suspectsList}[/list]
[b]VEHICLE(S):[/b][list]
${vehiclesList}[/list]
[b]MEDIA:[/b][list]
${mediaList}[/list][/list]
[/divbox]

[lspdsubtitle]4. DISCLAIMER[/lspdsubtitle]
[divbox=white]
[divbox=#ffffde]I, the undersigned, hereby affirm that the above statement is true to the best of my knowledge and belief, affirm that this statement has been made voluntarily, not under distress, threat, force, or coercion, and without promise or guarantee of reward. I hereby release and agree to hold harmless the State of San Andreas, the City of Los Santos, the Los Santos Police Department, and their employees, from any and all liability for any loss of life, bodily injury, property damage, or any claim whatsoever, which I may sustain in the context of this information report. [ooc] I hereby affirm that all information submitted through this form has been obtained through in-character means and channels. [/ooc][/divbox]
[list=none]
[b]SIGNATURE:[/b] [i][font=Bradley Hand ITC] ${signature}[/font][/i]
[b]DATE SIGNED:[/b] ${dateSigned}
[/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('br_bbcodeOutput').textContent = bbcode;
    document.getElementById('br_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=23", "_blank");
    });
}

function clearBountyReportData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#bounty-report input[type='text'], #bounty-report textarea").forEach(el => el.value = "");
        document.querySelectorAll("#bounty-report input[type='date']").forEach(el => el.value = "");
        
        // Reset dynamic lists
        document.getElementById('br_propertyContainer').innerHTML = `
            <input type="text" name="br_property[]" placeholder="# StreetName" style="margin-bottom: 8px;" required>
            <input type="text" name="br_property[]" placeholder="# StreetName" style="margin-bottom: 8px;">
        `;
        
        document.getElementById('br_affiliationsContainer').innerHTML = `
            <input type="text" name="br_affiliations[]" placeholder="CRIMINAL ORGANIZATION OR GANG NAME" style="margin-bottom: 8px;">
            <input type="text" name="br_affiliations[]" placeholder="CRIMINAL ORGANIZATION OR GANG NAME" style="margin-bottom: 8px;">
        `;
        
        document.getElementById('br_suspectsContainer').innerHTML = `
            <input type="text" name="br_suspects[]" placeholder="Firstname Lastname - Description" style="margin-bottom: 8px;">
            <input type="text" name="br_suspects[]" placeholder="Firstname Lastname - Description" style="margin-bottom: 8px;">
        `;
        
        document.getElementById('br_vehiclesContainer').innerHTML = `
            <input type="text" name="br_vehicles[]" placeholder="Model, Color, Plate, Other Details" style="margin-bottom: 8px;">
            <input type="text" name="br_vehicles[]" placeholder="Model, Color, Plate, Other Details" style="margin-bottom: 8px;">
        `;
        
        document.getElementById('br_mediaContainer').innerHTML = `
            <div class="media-row" style="display: flex; gap: 8px; margin-bottom: 8px;">
                <input type="text" name="br_mediaLink[]" placeholder="LINK HERE" style="flex: 1;">
                <input type="text" name="br_mediaDesc[]" placeholder="Description of Provided Media" style="flex: 2;">
            </div>
            <div class="media-row" style="display: flex; gap: 8px; margin-bottom: 8px;">
                <input type="text" name="br_mediaLink[]" placeholder="LINK HERE" style="flex: 1;">
                <input type="text" name="br_mediaDesc[]" placeholder="Description of Provided Media" style="flex: 2;">
            </div>
        `;
        
        document.getElementById("br_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

function generateRoadClosurePermitBBCode() {
    // Validate first
    const errors = validateRoadClosurePermit();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("rcp_fullName").value || "ANSWER HERE";
    const dateOfBirth = formatDate(document.getElementById("rcp_dateOfBirth").value) || "DD/MON/YYYY";
    const phoneNumber = document.getElementById("rcp_phoneNumber").value || "ANSWER HERE";
    const agency = document.getElementById("rcp_agency").value || "N/A";
    const driversLicense = document.getElementById("rcp_driversLicense").value || "PASTE URL HERE";
    const employeeCredentials = document.getElementById("rcp_employeeCredentials").value || "N/A";
    const eventLicense = document.getElementById("rcp_eventLicense").value || "N/A";
    
    const eventLocation = document.getElementById("rcp_eventLocation").value || "ANSWER HERE";
    const eventDate = formatDate(document.getElementById("rcp_eventDate").value) || "DD/MON/YYYY";
    const startTime = document.getElementById("rcp_startTime").value || "ANSWER HERE";
    const finishTime = document.getElementById("rcp_finishTime").value || "ANSWER HERE";
    const participants = document.getElementById("rcp_participants").value || "ANSWER HERE";
    const eventDetails = document.getElementById("rcp_eventDetails").value || "ANSWER HERE";
    
    const blsYes = document.querySelector('input[name="rcp_blsCertified"][value="yes"]')?.checked;
    const blsNo = document.querySelector('input[name="rcp_blsCertified"][value="no"]')?.checked;
    const blsIndividuals = document.getElementById("rcp_blsIndividuals").value || "";
    
    const signature = document.getElementById("rcp_signature").value || "ANSWER HERE";
    const dateSigned = formatDate(document.getElementById("rcp_dateSigned").value) || "DD/MON/YYYY";
    
    const bbcode = `[img]https://i.imgur.com/2ewzGVQ.png[/img]
[lspdsubtitle]1. REQUESTEE DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]1.1 Full Name:[/b] ${fullName}
[b]1.2 Date of Birth:[/b] ${dateOfBirth}
[b]1.3 Phone Number:[/b] ${phoneNumber}
[b]1.4 Agency/Organization (If applicable):[/b] ${agency}
[b]1.5 Please attach a photocopy of your driver's license[/b]
[list=none]
[h] (( /licenses )) [/h]
[url= ${driversLicense}] ATTACHED [/url]
[/list]
[b]1.6 If requesting on behalf of a government agency/organization, please attach a copy of your employee credentials [ooc] /badge [/ooc]:[/b][list=none]
[url= ${employeeCredentials} ]ATTACHED[/url]
[/list]
[b]1.7 Please attach a copy of your event planning license, obtained via City Hall (If applicable):[/b][list=none]
[url= ${eventLicense} ]ATTACHED[/url]
[/list][/divbox]

[lspdsubtitle]2. EVENT DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]2.1 Event location:[/b] ${eventLocation}
[b]2.2 Event date:[/b] ${eventDate}
[b]2.3 Start time (( UTC )):[/b] ${startTime}
[b]2.4 Estimated finish time (( UTC )):[/b] ${finishTime}
[b]2.5 Estimated number of participants:[/b] ${participants}
[b]2.6 Details of planned event (Please provide a map with planned road closures, if they are required, an example can be seen [url=https://i.imgur.com/gsAaG8Q.png]here[/url]):[/b][list=none]
${eventDetails}
[/list]
[b]2.7 Is someone BLS certified required for this event? If so, please inform us of the names of the individuals who will be in attendance:[/b][list=none]
[${blsYes ? 'x' : ''}] Yes, we have one or more individuals that are BLS certified.
[${blsNo ? 'x' : ''}] No, we do not have any individuals that are BLS certified.

If yes, please list the individual(s): ${blsIndividuals}
[/list][/list][/divbox]

[lspdsubtitle]3. INDEMINIFICATION AND HOLD HARMLESS AGREEMENT[/lspdsubtitle]
[divbox=white][divbox=#ffffde]
In consideration of the granting of the road closure permit, except for the active negligence or willful misconduct of City or any of its Boards, Officers, Agents, Employees, Assigns, and Successors in Interest, the permittee undertakes and agrees to defend, indemnify, and hold harmless City and any and all of City's Boards, Officers, Agents, Employees, Assigns, and Successors in Interest, from and against all suits and causes of actions, claims, losses, demands, and expenses, including, but not limited to, attorney's fees and costs of litigation, damage or liability of any nature whatsoever, for death or injury to any person, including permittee's employees and agents, or damage or destruction of any property of either party hereto or of third parties, arising in any manner by reason of the negligent acts, errors, omissions or willful misconduct incident to the performance of this Agreement on the part of the permittee.
[/divbox][list=none]
[b]3.1 Signature:[/b] ${signature}
[b]3.2 Date Signed:[/b] ${dateSigned}
[/list][/divbox][lspdfooter][/lspdfooter]`;
    
    document.getElementById('rcp_bbcodeOutput').textContent = bbcode;
    document.getElementById('rcp_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=2076", "_blank");
    });
}

function clearRoadClosurePermitData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#road-closure-permit input[type='text'], #road-closure-permit textarea").forEach(el => el.value = "");
        document.querySelectorAll("#road-closure-permit input[type='date']").forEach(el => el.value = "");
        document.querySelectorAll("#road-closure-permit input[type='radio']").forEach(el => el.checked = false);
        document.getElementById("rcp_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

function generateRideAlongBBCode() {
    // Validate first
    const errors = validateRideAlong();
    const errorHTML = formatValidationErrors(errors);
    
    if (errorHTML) {
        showCustomModal(errorHTML, null, () => {});
        return;
    }
    
    const fullName = document.getElementById("ra_fullName").value || "First Lastname";
    const dateOfBirth = formatDate(document.getElementById("ra_dateOfBirth").value) || "DD/MON/YYYY";
    const phoneNumber = document.getElementById("ra_phoneNumber").value || "####";
    const convicted = document.getElementById("ra_convicted").value || "Yes/No";
    const why = document.getElementById("ra_why").value || "Insert Answer Here";
    const signature = document.getElementById("ra_signature").value || "FIRST LASTNAME";
    const dateSigned = formatDate(document.getElementById("ra_dateSigned").value) || "DD/MON/YYYY";
    
    const bbcode = `[img]https://i.imgur.com/AXWi4nE.png[/img]
[lspdsubtitle]1. REQUESTEE DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]1.1 Full Name:[/b] ${fullName}
[b]1.2 Date of Birth:[/b] ${dateOfBirth}
[b]1.3 Phone Number:[/b] ${phoneNumber}
[b]1.4 Have you ever been convicted of a crime?:[/b] ${convicted}
[/list][/divbox]

[lspdsubtitle]2. REQUEST DETAILS[/lspdsubtitle]
[divbox=white][list=none]
[b]2.1 Why do you wish to go on a ride-along with the Los Santos Police Department?[/b]
${why}
[/divbox]

[lspdsubtitle]3. RELEASE & WAIVER[/lspdsubtitle]
[divbox=white]
[divbox=#ffffde]I, the undersigned, hereby release and agree to hold harmless the State of San Andreas, the Los Santos Police Department, their employees, from any and all liability for any loss of life, bodily injury, property damage, or any claim whatsoever, which I may sustain while riding in or upon said motor vehicles and which I may receive while accompanying an officer of the Los Santos Police Department, regardless of the cause of such damage or injury, whether through negligence or otherwise. I agree to assume all risks in riding in Los Santos Police Department's motor vehicles and in accompanying its officers and I am fully aware that personal danger may be involved. I further promise that I have read and fully understand all ride-along regulations.[/divbox]
[list=none]
[b]3.1 Signature:[/b] [i][font=Bradley Hand ITC] ${signature} [/font][/i]
[b]3.2 Date Signed:[/b] ${dateSigned}
[/list][/divbox]
[lspdfooter][/lspdfooter]`;
    
    document.getElementById('ra_bbcodeOutput').textContent = bbcode;
    document.getElementById('ra_bbcodeContainer').classList.remove('hidden');
    
    showCustomModal("Do you want to copy the format and open the forums?", () => {
        navigator.clipboard.writeText(bbcode).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });
        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=210", "_blank");
    });
}

function clearRideAlongData() {
    showCustomModal("Are you sure you want to clear all data?", () => {
        document.querySelectorAll("#ride-along-program input[type='text'], #ride-along-program textarea").forEach(el => el.value = "");
        document.querySelectorAll("#ride-along-program input[type='date']").forEach(el => el.value = "");
        document.getElementById("ra_bbcodeContainer").classList.add("hidden");
        autoSaveDraft();
    });
}

// Initialize application on page load
window.addEventListener("DOMContentLoaded", () => {
    // Set current UTC date for "Date Signed" fields
    const dateSigned = document.getElementById("dateSigned");
    const today = new Date().toISOString().split("T")[0];
    dateSigned.value = today;
    
    // Set date for all other date signed fields
    document.getElementById("sf_dateSigned").value = today;
    document.getElementById("pf_dateSigned").value = today;
    document.getElementById("sl_dateSigned").value = today;
    document.getElementById("fc_dateSigned").value = today;
    document.getElementById("mf_dateSigned").value = today;
    document.getElementById("gc_dateSigned").value = today;
    document.getElementById("pp_dateSigned").value = today;
    document.getElementById("sbc_dateSigned").value = today;
    document.getElementById("cbc_dateSigned").value = today;
    document.getElementById("br_dateSigned").value = today;
    document.getElementById("rcp_dateSigned").value = today;
    document.getElementById("ra_dateSigned").value = today;
    
    // Migrate old navigation state if exists
    if (localStorage.getItem('navHidden') !== null) {
        localStorage.setItem('navCollapsed', localStorage.getItem('navHidden'));
        localStorage.removeItem('navHidden');
    }
    
    // Restore navigation visibility state
    restoreNavigationState();
    
    // Load saved draft
    loadDraftOnPageLoad();
    
    // Setup auto-save
    setupAutoSave();
    
    // Setup conditional listeners
    setupConditionalListeners();
    
    // Initial update of conditional requirements
    updateConditionalRequirements();
    updateBLSRequirement();
    
    // Set up scroll to top button
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Check initial scroll position
    handleScrollToTopVisibility();
});
