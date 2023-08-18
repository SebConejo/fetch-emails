# fetch-emails

This tool allow to fetch emails from a Github profile list using Github API.

## prerequisites
- [Node.js 18](https://nodejs.org/fr)

## How to use

1. Clone or download the repository

2. Make sure you replace `YOUR_GITHUB_TOKEN`` with your actual GitHub personal access token

3. Update the `usernames`` array with the GitHub usernames you want to retrieve emails for. Also, be aware of GitHub's terms of service and privacy policies when accessing user data through the GitHub API.

4. On your ternminal, rune the following command:

```
node fetch-emails.js
```

The script will create a `github_emails.json` file at the root with the emails found for each user.

**Result example:**

```
// github_emails.json
{
  "user1": "user1@gmail.com",
  "user2": "user2@gmail.com",
  "user3": "user3@gmail.com",
}
```

**Notes**

1. The script can take a few minutes depending on the number of users you want to retrieve emails for.

2. If you recover too many emails, github will refuse your next requests. I recommend limiting a file to 1000 emails

3. If you repeat the command, the `github_emails.json` file will overwrite the previous one.
