import {
    getSolidDataset,
    getThing,
    setThing,
    getStringNoLocale,
    setStringNoLocale,
    saveSolidDatasetAt
} from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";
import { VCARD } from "@inrupt/vocab-common-rdf";
import {dataset} from "@inrupt/solid-client/dist/rdfjs";

// If your Pod is *not* on `solidcommunity.net`, change this to your identity provider.
const SOLID_IDENTITY_PROVIDER = "https://solidweb.org";
document.getElementById(
    "solid_identity_provider"
).innerHTML = `[<a target="_blank" href="${SOLID_IDENTITY_PROVIDER}">${SOLID_IDENTITY_PROVIDER}</a>]`;

const NOT_ENTERED_WEBID =
    "...not logged in yet - but enter any WebID to read from its profile...";

const session = new Session();

const buttonLogin = document.getElementById("btnLogin");
const writeForm = document.getElementById("writeForm");
const btnRead = document.getElementById("btnRead");

// 1a. Start Login Process. Call session.login() function.
async function login() {
    if (!session.info.isLoggedIn) {
        await session.login({
            oidcIssuer: SOLID_IDENTITY_PROVIDER,
            clientName: "Inrupt tutorial client app",
            redirectUrl: window.location.href
        });
    }
}

async function handleRedirectAfterLogin() {
    await session.handleIncomingRedirect(window.location.href);
    if (session.info.isLoggedIn) {
        // Update the page with the status.
        document.getElementById(
            "labelStatus"
        ).innerHTML = `Connected with your WebID : [<a target="_blank" id="webID" href="${session.info.webId}">${session.info.webId}</a>].`;
        document.getElementById("labelStatus").setAttribute("role", "alert");
        document.getElementById("webID").value = session.info.webId;
    }
}

handleRedirectAfterLogin();


async function writeProfile() {
    const name = document.getElementById("input_name").value;

    if (!session.info.isLoggedIn) {
        // You must be authenticated to write.
        document.getElementById(
            "labelWriteStatus"
        ).textContent = `...you can't write [${name}] until you first login!`;
        document.getElementById("labelWriteStatus").setAttribute("role", "alert");
        return;
    }
    const webID = session.info.webId;
    // The WebID can contain a hash fragment (e.g. `#me`) to refer to profile data
    // in the profile dataset. If we strip the hash, we get the URL of the full
    // dataset.
    const profileDocumentUrl = new URL(webID);
    profileDocumentUrl.hash = "";

    // To write to a profile, you must be authenticated. That is the role of the fetch
    // parameter in the following call.
    let myProfileDataset = await getSolidDataset(profileDocumentUrl.href, {
        fetch: session.fetch
    });

    // The profile data is a "Thing" in the profile dataset.
    let profile = getThing(myProfileDataset, webID);

    // Using the name provided in text field, update the name in your profile.
    // VCARD.fn object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#fn".
    // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#fn" string instead of VCARD.fn.
    profile = setStringNoLocale(profile, VCARD.fn, name);

    // Write back the profile to the dataset.
    myProfileDataset = setThing(myProfileDataset, profile);

    // Write back the dataset to your Pod.
    await saveSolidDatasetAt(profileDocumentUrl.href, myProfileDataset, {
        fetch: session.fetch
    });

    // Update the page with the retrieved values.
    document.getElementById(
        "labelWriteStatus"
    ).textContent = `Wrote [${name}] as name successfully!`;
    document.getElementById("labelWriteStatus").setAttribute("role", "alert");
    document.getElementById(
        "labelStatus"
    ).textContent = `...click the 'Read Profile' button to to see what the name might be now...?!`;
}

// 3. Read profile
async function readProfile() {
    const webID = document.getElementById("webID").value;

    if (webID === NOT_ENTERED_WEBID) {
        document.getElementById(
            "labelStatus"
        ).textContent = `Login first, or enter a WebID (any WebID!) to read from its profile`;
        return false;
    }

    try {
        new URL(webID);
    } catch (_) {
        document.getElementById(
            "labelStatus"
        ).textContent = `Provided WebID [${webID}] is not a valid URL - please try again`;
        return false;
    }

    const profileDocumentUrl = new URL(webID);
    profileDocumentUrl.hash = "";

    // Profile is public data; i.e., you do not need to be logged in to read the data.
    // For illustrative purposes, shows both an authenticated and non-authenticated reads.

    let myDataset;
    try {
        if (session.info.isLoggedIn) {
            myDataset = await getSolidDataset(profileDocumentUrl.href, { fetch: session.fetch });
        } else {
            myDataset = await getSolidDataset(profileDocumentUrl.href);
        }
    } catch (error) {
        document.getElementById(
            "labelStatus"
        ).textContent = `Entered value [${webID}] does not appear to be a WebID. Error: [${error}]`;
        return false;
    }

    const profile = getThing(myDataset, webID);

    // Get the formatted name (fn) using the property identifier "http://www.w3.org/2006/vcard/ns#fn".
    // VCARD.fn object is a convenience object that includes the identifier string "http://www.w3.org/2006/vcard/ns#fn".
    // As an alternative, you can pass in the "http://www.w3.org/2006/vcard/ns#fn" string instead of VCARD.fn.

    const formattedName = getStringNoLocale(profile, "http://www.w3.org/2006/vcard/ns#fn");
    const role = getStringNoLocale(profile, "http://www.w3.org/2006/vcard/ns#role");
    const orga = getStringNoLocale(profile, "http://www.w3.org/2006/vcard/ns#organization-name");
    const note = getStringNoLocale(profile, "http://www.w3.org/2006/vcard/ns#note");

    console.log(profile);

    const mailtoProfil = getThing(myDataset, profile.predicates["http://www.w3.org/2006/vcard/ns#hasEmail"].namedNodes[0]);
    const mailto = mailtoProfil.predicates["http://www.w3.org/2006/vcard/ns#value"].namedNodes[0];
    const mail = mailto.replace('mailto:', '')

    const hasPhoneProfile = getThing(myDataset, profile.predicates["http://www.w3.org/2006/vcard/ns#hasTelephone"].namedNodes[0]);
    const hasPhone = hasPhoneProfile.predicates["http://www.w3.org/2006/vcard/ns#value"].namedNodes[0];
    const phone = hasPhone.replace('tel:', '');

    const hasPhoto = profile.predicates["http://www.w3.org/2006/vcard/ns#hasPhoto"].namedNodes[0];

    // Update the page with the retrieved values.
    document.getElementById("avatar").src= hasPhoto;
    document.getElementById("first_name").value = formattedName;
    document.getElementById("role").value = role;
    document.getElementById("orga").value = orga;
    document.getElementById("phone").value = phone;
    document.getElementById("mail").value = mail;
    document.getElementById("presentation").value = note;
}



buttonLogin.onclick = function () {
    login();
};


/*
writeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    writeProfile();
});
 */

btnRead.onclick = function () {
    readProfile();
};