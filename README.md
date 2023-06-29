# PeerWallet

## Overview

Peer wallet is an application that enables users to deposit money in digital wallets and transfer to other users of the application.

The server is hosted [here](https://peer-wallet-production.up.railway.app/api/v1/).

## Approach

The deposit feature works by initializing a transaction with paystack.

And then hitting a verification endpoint with the payment reference to confirm payment. This isn't optimal and the preffered way would have been to use a webhook but the webhook feature is not available to me as of now.

The transfer features works by using a database transaction:

- Entries are created on each wallet: debit to the sender and credit to the receiver.
- Then a transfer record is entered into the database
- The user wallet is updated.

If any of the above transactions fail, the whole operation is reverted.

## Documentation

### Creating an account

```js
fetch("/api/v1/users", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    "firstName": [firstName]
    "lastName": [lastName]
    "email": [email]
    "password": [password]
  }
});
```

### Logging In

```js
fetch("/api/v1/users/login", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    "email": [email]
    "password": [password]
  }
});
```

    Note: Make sure your browser or http client can save cookies

### Making a deposit

#### Initialize Deposit

```js
fetch("/api/v1/users/deposit/initialize", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    amount: [amount],
  },
});
```

#### Verify Deposit

```js
fetch("/api/v1/users/deposit/verify", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    reference: [reference],
  },
});
```

### Transferring

```js
fetch("/api/v1/transfers", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    email: [email],
    amount: [amount],
  },
});
```

### Viewing Entries

This feature could be useful when completed.

```js
fetch("/api/v1/entries", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {
    email: [email],
    amount: [amount],
  },
});
```

## Reflections

- Adding validations to the request are very important. I glossed over that in order to get the demo to work.

- Using a webhook to verify the payment would be better than allowing the front end to call an api to verify manually.

- The error handling could be very much better than what it is.

- As someone who usually uses Prisma, Sequelize isn't at all bad. But it fucked me up especially as regards to types.

[Check out the deployment here](https://peer-wallet-production.up.railway.app/api/v1/)
