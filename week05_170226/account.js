// Array to store accounts
let accounts = [];

function createAccount() {

    try {

        // ======================
        // GET VALUES
        // ======================

        let name = document.getElementById("name").value.trim();
        let age = document.getElementById("age").value;
        let contact = document.getElementById("contact").value.trim();
        let email = document.getElementById("email").value.trim();
        let address = document.getElementById("address").value.trim();
        let accountType = document.getElementById("accountType").value;
        let deposit = document.getElementById("deposit").value;
        let nomineeName = document.getElementById("nomineeName").value.trim();
        let relation = document.getElementById("relation").value.trim();

        // ======================
        // VALIDATION
        // ======================

        if (name === "" || age === "" || contact === "" || email === "" ||
            address === "" || accountType === "" || deposit === "" ||
            nomineeName === "" || relation === "") {
            throw "All fields including nominee details are mandatory!";
        }

        if (age < 18) {
            throw "Applicant must be 18 or older!";
        }

        if (contact.length !== 10) {
            throw "Contact number must be 10 digits!";
        }

        if (deposit < 1000) {
            throw "Minimum deposit amount is 1000!";
        }

        // Email validation
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(pattern)) {
            throw "Invalid Email Format!";
        }

        // ======================
        // STRING METHODS
        // ======================

        name = name.toUpperCase();
        email = email.toLowerCase();
        address = address.toUpperCase();
        nomineeName = nomineeName.toUpperCase();
        relation = relation.toUpperCase();

        // ======================
        // DATE
        // ======================

        let creationDate = new Date().toLocaleString();

        // ======================
        // ARRAY STORAGE
        // ======================

        let account = {
            name: name,
            age: age,
            contact: contact,
            email: email,
            address: address,
            accountType: accountType,
            deposit: deposit,
            nomineeName: nomineeName,
            relation: relation,
            createdOn: creationDate
        };

        accounts.push(account);

        // ======================
        // SUCCESS MESSAGE
        // ======================

        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerHTML =
            "Account Created Successfully! <br>Date: " + creationDate;

        console.log(accounts);

    }

    // ======================
    // ERROR HANDLING
    // ======================

    catch (error) {

        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = error;

    }

    finally {
        console.log("Account creation attempt finished.");
    }
}
