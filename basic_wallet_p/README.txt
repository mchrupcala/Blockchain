Account balances in a blockchain currency are not real values that are stored somewhere.  Instead, wallet programs derive this balance by adding and subtracting all of the transactions for the user that are recorded in the ledger, to calculate the current balance.

Build a simple wallet app using the front-end technology of your choice.  You will not be evaluated on the aesthetics of your app.

This app should:
    * Allow the user to enter, save, or change the `id` used for the program
        - user enters their ID into a form submission
        - ID should be written into the blockchain with the amount being sent.

    * Display the current balance for that user
        - ping the /chain endpoint, receive a JSON object of the chain, save an int value of all the user ID's coins.
        - do I write this as a new PY file, or write it into the JS?
        ...since I have endpoints on localhost...should just write a FE api call
    
    * Display a list of all transactions for this user, including sender and recipient

Stretch Goals:
    * Use styling to visually distinguish coins sent and coins received
    * Paginate the list of transactions if there are more than ten