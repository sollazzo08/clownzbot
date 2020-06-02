require('dotenv').config();
const {Discord, Client, MessageAttachment, MessageEmbed, Guild} = require('discord.js');
const PREFIX = process.env.PREFIX;
const TOKEN = porcess.env.TOKEN;
const client = new Client();


client.login(TOKEN);

// this is needed, so the bot can start recieving information 
client.on('ready',() => {
  console.log(`${client.user.tag} has logged in.`);
  
})

const checkPermissions = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('MANAGE_CHANNELS') || role.permissions.has('BAN_MEMBERS') ||
                                    role.permissions.has('MANAGE_GUILD');
const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName)
const rollDice = () => Math.floor(Math.random() * 6) + 1;

client.on('message', (message) => {
  if(message.author.bot) return;
  if(isValidCommand(message, 'hello')){
    message.reply('hello!');
    console.log(message.guild.available);
    console.log(message.member.guild.memberCount)
    console.log(message.guild.roles);
  
    
    
    
  }
   else if(isValidCommand(message, 'rolldice')){
    message.reply("rolled a " + rollDice());
  }
   else if(isValidCommand(message, 'add')){
     console.log(message.content);
     let args = message.content.toLowerCase().substring(5);
     let { cache } = message.guild.roles;
     let role = cache.find(role => role.name.toLowerCase() === args);
     console.log(cache);
     if(role){
        if(message.member.roles.cache.has(role.id)) {
          message.channel.send('You already have this role!')
          return;
        }
        if(checkPermissions(role)){
          message.channel.send('You cannot add youself to this role.')
        } else {

            message.member.roles.add(role) //add function returns a promise, need to handle
              .then(member => message.channel.send('You were added to this role!'))
              .catch(err => {
                console.log(err);
                message.channel.send('Something went wrong...');
              }); 
              
  
        }
      }
          else {
            message.channel.send('Role not found!');
          }
          
   }
   else if(isValidCommand(message, 'embed')){
      let embed = new MessageEmbed()
       .setTitle('Test Title ')
       .setColor('RED')
       .setAuthor(message.author.username)
       .setDescription('This is the description')
       .setImage(message.author.displayAvatarURL())
       message.reply(embed);
   }

})


client.on('message', message => {
  if(message.content === 'what is my avatar'){
    message.reply(message.author.displayAvatarURL())
  }
})

client.on('message', (message) => {
  if(message.content === '!rip'){
    const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
    message.channel.send(`${message.author}`,attachment);
  }
})


