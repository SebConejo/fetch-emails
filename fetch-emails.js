const fs = require('fs/promises') // ES6-style file system module

const githubToken = 'YOUR_GITHUB_TOKEN'
const usernames = [`user1`, `user2`, `user3`]

const getUserEmail = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })

  if (response.ok) {
    const userData = await response.json()
    return userData.email
  } else if (response.status === 404) {
    console.log(`User '${username}' not found on GitHub.`)
  } else {
    console.log(
      `Error retrieving user data for '${username}'. Status code: ${response.status}`
    )
  }

  return null
}

const main = async () => {
  const emailData = {}

  for (const username of usernames) {
    const email = await getUserEmail(username)
    if (email) {
      emailData[username] = email
    }
  }
  const jsonData = JSON.stringify(emailData, null, 2)

  try {
    await fs.writeFile('github_emails.json', jsonData)
    console.log('Email data saved to github_emails.json')
  } catch (error) {
    console.error('Error writing JSON file:', error)
  }
}

main()
