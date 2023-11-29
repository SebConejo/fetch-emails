const axios = require('axios');
const fs = require('fs');

const token = 'YOUR_GITHUB_TOKEN'; // Remplacez par votre jeton d'accès personnel
const usernames = [
  'username1','username2'
]; // Remplacez par la liste des pseudos

async function getEmailsFromUsernames(usernames) {
    const usersWithEmails = {};

    for (const username of usernames) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            // L'email peut être null si l'utilisateur n'a pas rendu son email public
            usersWithEmails[username] = response.data.email || 'Email non public';
        } catch (error) {
            console.error(`Erreur lors de la récupération des données pour ${username}: `, error);
            usersWithEmails[username] = 'Erreur lors de la récupération de l\'email';
        }
    }

    return usersWithEmails;
}

getEmailsFromUsernames(usernames).then(usersWithEmails => {
    fs.writeFile('users_emails.json', JSON.stringify(usersWithEmails, null, 2), err => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier JSON', err);
        } else {
            console.log('Fichier users_emails.json créé avec succès');
        }
    });
});
