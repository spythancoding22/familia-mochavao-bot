const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

(async () => {
  try {
    console.log('⏳ Registrando comandos...');

    await rest.put(
      Routes.applicationGuildCommands(
        '1449610187433443418',
        '1313568206132220034'
      ),
      { body: commands }
    );

    console.log('✅ Comandos registrados!');
  } catch (error) {
    console.error(error);
  }
})();