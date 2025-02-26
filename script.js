let debounceTimeout;

function autoSaveDraft() {
    const formData = {};

    document.querySelectorAll("input, textarea, select").forEach(element => {
        if (element.type === "checkbox" || element.type === "radio") {
            formData[element.id || element.name] = element.checked;
        } else {
            formData[element.id || element.name] = element.value;
        }
    });

    localStorage.setItem("applicationDraft", JSON.stringify(formData));

    // Show auto-save status
    const status = document.getElementById("autoSaveStatus");

    // Clear any existing notification to prevent overlap
    status.textContent = "";
    status.classList.remove("visible");

    // Set new notification text
    status.textContent = "Draft auto-saved.";
    status.classList.add("visible");

    // Hide the status after 2 seconds
    setTimeout(() => status.classList.remove("visible"), 2000);
}

// Debounce function to limit the auto-save to occur after typing stops for a certain time
function debounceAutoSave(event) {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        autoSaveDraft();
    }, 1000);  // 1000ms delay after the last input or blur event
}

// Add event listeners to all input, textarea, and select elements
function setupAutoSave() {
    const formElements = document.querySelectorAll("input, textarea, select");

    formElements.forEach(element => {
        // Remove existing listeners to avoid duplicates
        element.removeEventListener("input", debounceAutoSave);
        element.removeEventListener("change", debounceAutoSave);

        // Add event listeners for 'input' (typing) and 'blur' (losing focus) events
        element.addEventListener("input", debounceAutoSave);
        element.addEventListener("change", debounceAutoSave);
    });
}

// Load saved form data from localStorage
function loadDraftOnPageLoad() {
    const savedData = JSON.parse(localStorage.getItem("applicationDraft"));

    if (savedData) {
        document.querySelectorAll("input, textarea, select").forEach(element => {
            const value = savedData[element.id || element.name];
            if (value !== undefined) {
                if (element.type === "checkbox" || element.type === "radio") {
                    element.checked = value; // Restore checked state
                } else {
                    element.value = value; // Restore value
                }
            }
        });

        console.log("Draft loaded successfully."); // Optional: Log for debugging
    }
}

// Call loadDraftOnPageLoad when the page is loaded
window.addEventListener("DOMContentLoaded", loadDraftOnPageLoad);

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
        alert('You must have at least one extra faction row.');
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
        alert('You must have at least one extra employment row.');
    }
}

// Initial setup
window.addEventListener("DOMContentLoaded", setupAutoSave);

// Function to generate BBCode
function generateBBCode() {
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

let combinedResults = ""; // Variable to hold all formatted strings

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

    // Append the formatted string to the combinedResults variable
    combinedResults += formattedString; // Add a separator between records
}

    const workShiftMorning = document.getElementById("workShiftMorning").checked ? "[cbc]" : "[cb]";
    const workShiftAfternoon = document.getElementById("workShiftAfternoon").checked ? "[cbc]" : "[cb]";
    const workShiftEvening = document.getElementById("workShiftEvening").checked ? "[cbc]" : "[cb]";
    const workShiftNight = document.getElementById("workShiftNight").checked ? "[cbc]" : "[cb]";

    // Driver's License and Firearm License radio buttons (adjust to [cbc] or [cb] format)
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
    const referral = document.getElementById("referral").value || "ANSWER";

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
        const charName = characterNames[i].value || "CHARACTER NAME";
        const faction = factions[i].value || "FACTION";
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

// Function to clear data
function clearData() {
    // Show confirmation popup
    showCustomModal("Are you sure you want to clear all data?", () => {
        // Clear all text inputs and textareas
        document.querySelectorAll("input[type='text'], textarea").forEach(el => el.value = "");

        // Clear all checkboxes and radio buttons
        document.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(el => el.checked = false);

        // Remove all dynamically added Employment rows
        const employmentSection = document.getElementById("employmentSection");
        if (employmentSection) {
            const rows = employmentSection.getElementsByClassName("employmentContainer");
            while (rows.length > 1) { // Remove all rows
                employmentSection.removeChild(rows[rows.length - 1]);
            }
        }

        // Remove all dynamically added Faction rows
        const factionContainer = document.getElementById("factionContainer");
        if (factionContainer) {
            const rows = factionContainer.getElementsByClassName("faction-row");
            while (rows.length > 1) { // Remove all rows
                factionContainer.removeChild(rows[rows.length - 1]);
            }
        }

        // Hide the BBCode container
        document.getElementById("bbcodeContainer").classList.add("hidden");
    });
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

// Set current UTC date for "Date Signed" field
window.onload = function () {
    const dateSigned = document.getElementById("dateSigned");
    const today = new Date().toISOString().split("T")[0];
    dateSigned.value = today;
}
