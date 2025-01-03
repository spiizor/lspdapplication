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

// Function to generate BBCode
function generateBBCode() {
    const fullName = document.getElementById("fullName").value || "YOUR NAME HERE";
    const dateOfBirth = formatDate(document.getElementById("dateOfBirth").value) || "DD/MMM/YYYY";
    const phoneNumber = document.getElementById("phoneNumber").value || "NUMBER";
    const proofOfIdentification = document.getElementById("proofOfIdentification").value || "ADD DIRECT IMAGE LINK TO YOUR SCREENSHOT REPLACING THIS TEXT IN CAPS ONLY";


    const employmentSections = document.querySelectorAll(".employmentContainer");
    const results = [];
    let combinedResults = ""; // Variable to hold all formatted strings

    // Loop through each container and collect its data
    employmentSections.forEach((section) => {
        const companyName = section.querySelector("#companyName").value;
        const position = section.querySelector("#position").value;
        const directSupervisor = section.querySelector("#directSupervisor").value;
        const termOfEmployment = section.querySelector("#termOfEmployment").value;
        const summaryOfDuties = section.querySelector("#summaryOfDuties").value;
        const reasonForLeaving = section.querySelector("#reasonForLeaving").value;

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
        combinedResults += formattedString + "\n\n"; // Add a separator between records
    });

    const companyName = document.getElementById("companyName").value || "COMPANY";
    const position = document.getElementById("position").value || "POSITION";
    const directSupervisor = document.getElementById("directSupervisor").value || "SUPERVISOR";
    const termOfEmployment = document.getElementById("termOfEmployment").value || "DD/MMM/YYYY to DD/MMM/YYYY";
    const summaryOfDuties = document.getElementById("summaryOfDuties").value || "DUTIES";
    const reasonForLeaving = document.getElementById("reasonForLeaving").value || "REASON";

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
    const criminalRecordDetails = document.getElementById("criminalRecordDetails").value || "Explain any misdemeanors and felonies here.";

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
	const reinstatementApp = document.getElementById("reinstatementApp").value || "POST URL TO REINSTATEMENT HERE";
	
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


    const factionServeryesButCheck = document.querySelector("input[name='factionServer'][value='yesBut']").checked ? true : false;
    const factionServeryesAndCheck = document.querySelector("input[name='factionServer'][value='yesAnd']").checked ? true : false;

    let factionServeryesButExplanation = "";
    let factionServeryesAndExplanation = "";
    if (factionServeryesButCheck) {
        factionServeryesButExplanation = document.getElementById("factionServerExplanation").value || "";
    }
    else if (factionServeryesAndCheck) {
        factionServeryesAndExplanation = document.getElementById("factionServerExplanation").value || "";
    }

    const obligationsYes = document.querySelector("input[name='obligations'][value='Yes']").checked ? "[cbc]" : "[cb]";
    const obligationsNo = document.querySelector("input[name='obligations'][value='No']").checked ? "[cbc]" : "[cb]";

    const availabilityExplanation = document.getElementById("availabilityExplanation").value || "AVAILABILITY EXPLANATION";

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
[ooc] Select the timezone/s that you will play in. The times below are based on the server time (/time) which is UTC. [/ooc]
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

[b]3.1 - Do you currently possess a valid driver's license?[/b]:
[LIST=NONE]
${driverLicenseYes} Yes
${driverLicenseNo} No
[/LIST]

[b]3.2 - Do you possess a valid firearm's license?[/b]:
[LIST=NONE]
${firearmLicenseYes} Yes
${firearmLicenseNo} No
[/LIST]

[b]3.3 - Criminal Record[/b]:
[LIST=NONE]

${criminalLessThan20} [b]Less than 20 Total Citations in 90 days, No Misdemeanors and No Felonies[/b]
---
${criminalMoreThan20} [b]More than 20 Total Citations in 90 days[/b]
${criminalMisdemeanors} [b]Previous Misdemeanors[/b]
${criminalFelonies} [b]Previous Felonies[/b]
[list][*] ${criminalRecordDetails} [/list]
[/list]
[b]3.4 - Fingerprints[/b]:
[list=none]
${fingerprints} Check this if you have had your fingerprints taken by Law Enforcement or Correctional Officers.
[/list]
[/list]
[/divbox]

[lspdsubtitle]4. GENERAL QUESTIONS[/lspdsubtitle]
[divbox=white]
There is no fixed word limit, but the more effort you put into your answer, the stronger your chances of being accepted. 
[i]You must not use AI for your application, either to generate or correct your answers.[/i]
[list=none]
[b]4.1 - Why do you wish to join the Los Santos Police Department?[/b]:
[LIST=NONE]
${whyJoin}
[/LIST]

[b]4.2 - Why do you think you would be a good fit for the Los Santos Police Department?[/b]:
[LIST=NONE]
${whyGoodFit}
[/LIST]

[b]4.3 - What goals do you have for your career as a Police Officer? Any divisions or areas of interest in the LSPD?[/b]:
[LIST=NONE]
${careerGoals}
[/LIST]

[b]4.4 - Do you have any current LSPD employees who you could use as a referral to support your application?[/b] [ooc] IC or OOC. [/ooc]:
[LIST=NONE]
${referral}
[/LIST][/list]
[/divbox]

[lspdsubtitle](( 5. OUT-OF-CHARACTER INFORMATION AND QUESTIONS ))[/lspdsubtitle]
[divbox=white][list=none][b]Please fill out your out of character information and where appropriate, mark the appropriate box for checkbox answers.[/b]
[size=90][c]Mark each box by changing [cb] to [cbc][/c][/size]

[list=none]
[b]5.1 - About You[/b]: [LIST=NONE]
Name or Nickname: ${nickname}
Age: ${age}
Country of Residence and Time Zone: ${countryTimeZone}
Discord Name: ${discordName}
Eclipse RP Forum Account Name: ${forumName}
Eclipse RP Forum Profile Link: [url=${forumLink}]PRESS HERE[/url]
[/LIST]

[b]5.2 - Have you ever been in the LSPD faction before?[/b] ([i]applies to any character[/i]): 
[LIST=NONE]
${lspdFactionYes} Yes.
${lspdFactionNo} No.
[/LIST]

[list=none][b]5.2.1 - If yes to 5.2, provide your reinstatement application:[/b] 
[LIST=NONE]
[url=${reinstatementApp}]REINSTATEMENT APPLICATION[/url]
[/LIST][/list]

[b]5.3 - Provide a Screenshot of your Admin Panel and Characters ([url=https://imgur.com/wK0OQhv]press here for an example[/url])[/b]:
[LIST=NONE]
[spoil]${panelScreenshot}[/spoil]
[/LIST]

[b]5.4 - List all the factions you are currently a part of ([i]include all your characters in factions[/i])[/b]: 
[LIST=NONE]
${factionList}
[/LIST]

[b]5.5 - Are you currently involved in and/or currently play on any other GTA Roleplay servers or communities?[/b]:
[LIST=NONE]
${factionServeryesBut} Yes, but not in a faction there. 
[i]${factionServeryesButExplanation}[/i]
${factionServeryesAnd} Yes, and in a faction there. [i]${factionServeryesAndExplanation}[/i]
${factionServerNo} No.
[/LIST][/list]

[b]5.6 - Do you have any upcoming obligation(s) which may limit your playing time or availability in the next three months?[/b]:
[LIST=NONE]
${obligationsYes} Yes. 
${obligationsNo} No.

[b]5.6.1 - If yes to 5.6, please explain how much this might affect your availability or play time:[/b] 
[LIST=NONE]
${availabilityExplanation}
[/LIST]
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

    if (window.confirm("Do you want to copy the format and open the forums?")) {

        // Copy the text to the clipboard
        navigator.clipboard.writeText(bbcode).then(() => {
        }).catch(err => {
            console.error("Failed to copy text:", err);
        });

        window.open("https://gov.eclipse-rp.net/posting.php?mode=post&f=89", "_blank");
    }


}

// Function to clear data
function clearData() {
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
    document.getElementById("bbcodeContainer").classList.add("hidden");
}

// Function to toggle light/dark theme
function toggleTheme() {
    document.body.classList.toggle("light-theme");
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

function handleFactionServerChange(event) {
    const selectedValue = event.target.value;

    // Perform checks based on the selected value
    if (selectedValue === "yesBut") {
        document.getElementById("factionServerExplanationHidden").classList.remove("hidden");
        document.getElementById("factionServerExplanationLabel").innerText = "Please explain further about your involvement in that server, how long, how much etc.."
        // Add your checks or actions here
    } else if (selectedValue === "yesAnd") {
        document.getElementById("factionServerExplanationHidden").classList.remove("hidden");
        document.getElementById("factionServerExplanationLabel").innerText = "Please explain further about your involvement in that server and what factions you are in.."
        // Add your checks or actions here
    } else if (selectedValue === "No") {
        document.getElementById("factionServerExplanationHidden").classList.add("hidden");
        // Add your checks or actions here
    }
}

// Set current UTC date for "Date Signed" field
window.onload = function () {
    const dateSigned = document.getElementById("dateSigned");
    const today = new Date().toISOString().split("T")[0];
    dateSigned.value = today;

    const factionServeryesBut = document.querySelector("input[name='factionServer'][value='yesBut']").checked ? true : false;
    const factionServeryesAnd = document.querySelector("input[name='factionServer'][value='yesAnd']").checked ? true : false;

    if (factionServeryesBut) {
        document.getElementById("factionServerExplanationHidden").classList.remove("hidden");
        document.getElementById("factionServerExplanationLabel").innerText = "Please explain further about your involvement in that server, how long, how much etc.."
    }
    else if (factionServeryesAnd) {
        document.getElementById("factionServerExplanationHidden").classList.remove("hidden");
        document.getElementById("factionServerExplanationLabel").innerText = "Please explain further about your involvement in that server and what factions you are in.."
    }
}
