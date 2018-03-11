const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity("Checking the reports.", {type: "PLAYING"})
});
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}serverinfo`){
    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Member Count", message.guild.memberCount);
    return message.channel.send(serverembed);
  }
  if(cmd === `${prefix}help`){
    message.channel.send("What kind of help do you require?")
    message.channel.send("If you need help with the reporting system than do !help1")
    message.channel.send("Wanna know the commands? !help2")
    return;
  }

    if(cmd === `${prefix}kick`){
       let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if(!kUser) return message.channel.send("Cant find user!");
       let kReason = args.join(" ").slice(22);
       if(!message.member.hasPermission("KICK_MEMBERS")) return message.chanel.send("You dont have permission to do this command.");
       if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can not be kicked.");

       let kickEmbed = new Discord.RichEmbed()
       .setDescription("Kick")
       .setColor("#15f153")
       .addField("Kicked User", `${kUser} With ID ${kUser.id}`)
       .addField("Kicked By", `<@${message.author.id} with ID ${message.author.id}`)
       .addField("Kicked In", message.channel)
       .addField("Time", message.createdAt)
       .addField("Reason", kReason);

       let kickChannel = message.guild.channels.find(`name`, `kicks-bans`);
       if(!kickChannel) return message.channel.send("Couldnt find Kick-Bans.");



       message.guild.member(kUser).kick(kReason);
       kickChannel.send(kickEmbed);





      return;
    }
  if(cmd === `${prefix}report`){
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldnt find user.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "reports")
    if(!reportschannel) return message.channel.send("Couldnt find reports channel.");




    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.author.send("Report sent to staff, Thank you for reporting.");
    message.delete().catch(O_o=>{});



    return;
  }
  if(cmd === `${prefix}help1`){
    message.channel.send("Alright, Make a channel called reports IT MUST BE SPELLED LIKE THAT OR IT WONT WORK.")
    message.channel.send("Thats all.")
  }
  if(cmd === `${prefix}help2`){
    message.channel.send("This is all the commands you can use me for! (More  commands comming soon.)")
    message.channel.send("!report")
    message.channel.send("!botinfo")
    message.channel.send("!serverinfo")
  }
  if(cmd === `${prefix}ban`){







    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Cant find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.chanel.send("You dont have permission to do this command.");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can not be banned.");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#15f153")
    .addField("Banned User", `${bUser} With ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id} with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, `kicks-bans`);
    if(!banChannel) return message.channel.send("Couldnt find Kick-Bans.");


              message.guild.member(bUser).ban(bReason);
              banChannel.send(banEmbed)

    return;
  }










  if(cmd === `${prefix}hello`){
    return message.channel.send("Hello!");
  }


  if(cmd === `${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Created On", bot.user.createdAt)
    .addField("Bot Name", bot.user.username);

    return message.channel.send(botembed);
  }

});

bot.login(NDIyMDkwODg5Njc5MjA4NDU4.DYaKMw.IyDtY-3tEJ1GInfcqiX4TgFaivk)
