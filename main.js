var express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
FormData = require('form-data'),
    axios = require('axios'),
    prefix = '>'
fs = require('fs'),
    { Client: a, MessageEmbed: b } = require('discord.js'),
    client = new a({ intents: 32767 })
app.use(bodyParser.text())
const ids = ['']
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.get('/admin', async (req, res) => {
    fs.readFile('./object.json', function (err, data) {
        let ee = JSON.parse(data)
        return res.json(ee)
    })
})
app.post('/', function (req, res) {
    let form = new FormData()
    form.append('client_id', '')
    form.append('client_secret', '')
    form.append('grant_type', 'authorization_code')
    form.append('redirect_uri', '')
    form.append('scope', 'identify', 'guilds.join')
    form.append('code', req.body)
    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: form,
    })
        .then((eeee) => eeee.json())
        .then((cdcd) => {
            ac_token = cdcd.access_token
            rf_token = cdcd.refresh_token
            let tgg = {
                headers: {
                    authorization: cdcd.token_type + ' ' + cdcd.access_token,
                },
            }
            axios
                .get('https://discordapp.com/api/v6/users/@me', tgg)
                .then((te) => {
                    let efjr = te.data.id
                    fs.readFile('./object.json', function (res, req) {
                        if (
                            JSON.parse(req).some(
                                (ususu) => ususu.userID === efjr
                            )
                        ) {
                            console.log(
                                '[-] ' +
                                te.data.username +
                                '#' +
                                te.data.discriminator
                            )
                            return
                        }
                        console.log(
                            '[+] ' +
                            te.data.username +
                            '#' +
                            te.data.discriminator
                        )
                        avatarHASH =
                            'https://cdn.discordapp.com/avatars/' +
                            te.data.id +
                            '/' +
                            te.data.avatar +
                            '.png?size=4096'
                        fetch('', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                avatar_url: '',
                                embeds: [
                                    {
                                        color: 3092790,
                                        title:
                                            te.data.username +
                                            '#' +
                                            te.data.discriminator +
                                            ' - ' +
                                            te.data.id,
                                        thumbnail: { url: avatarHASH },
                                        description:
                                            '```diff\n- New User\n\n- Pseudo: ' +
                                            te.data.username +
                                            '#' +
                                            te.data.discriminator +
                                            '\n\n- ID: ' +
                                            te.data.id +
                                            '```',
                                        timestamp: new Date(),
                                        footer: { text: 'ytzm-oauth2' },
                                    },
                                ],
                            }),
                        })
                        var papapa = {
                            userID: te.data.id,
                            avatarURL: avatarHASH,
                            username:
                                te.data.username + '#' + te.data.discriminator,
                            access_token: ac_token,
                            refresh_token: rf_token,
                        },
                            req = []
                        req.push(papapa)
                        fs.readFile('./object.json', function (res, req) {
                            var jzjjfj = JSON.parse(req)
                            jzjjfj.push(papapa)
                            fs.writeFile(
                                './object.json',
                                JSON.stringify(jzjjfj),
                                function (eeeeeeeee) {
                                    if (eeeeeeeee) {
                                        throw eeeeeeeee
                                    }
                                }
                            )
                        })
                    })
                })
                .catch((errrr) => {
                    console.log(errrr)
                })
        })
})


const talkedRecently = new Set()
client.on('messageCreate', async (message) => {
    let prefix = '>'
    const cmd = message.content.split(' ')[0]

            if (cmd === prefix + 'joinall') {
        if (!ids.includes(message.author.id)) {
            embed = new b()
            .setDescription(
                '> `' + message.author.username + ' is not whitelisted`'
            )
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
            return message.channel.send({ embeds: [embed] })
        }
        if (talkedRecently.has(message.author.id)) {
            let _0x2edff1 = new b()
                .setDescription('> `Please wait 5 minutes`')
                .setColor('#2f3136')
                .setFooter({ text: 'ahahha' })
            message.channel.send({ embeds: [_0x2edff1] })
            return
        }
        {
            console.log(
                '[+] Pub lancée par ' +
                message.author.tag +
                ' sur ' +
                message.guild.name
            )
            let embed = new b()
                .setDescription('> `Join en cours...`')
                .setColor('#2f3136')
                .setFooter({ text: 'ahahha' })
            message.channel.send({ embeds: [embed] })
            fs.readFile('./object.json', async function (err, data) {
                var json = JSON.parse(data);
                var err = 0;
                var success = 0;
                var already_joined = 0;
                for (var d of json) {
                    const user = await client.users.fetch(d.userID).catch(() => { });
                    if (message.guild.members.cache.get(d.userID)) {
                        already_joined++
                    }
                    await message.guild.members.add(user, { accessToken: d.access_token }).catch(() => { err++ })
                    success++
                }
                let embed = new b()
                    .setTitle('Pub finie')
                    .setDescription(
                        '> `> Déja Présent: ' +
                        already_joined +
                        '\n> Succès: ' +
                        (success - already_joined - err) +
                        '\n> Erreur: ' +
                        err +
                        '`'
                    )
                    .setColor('#2f3136')
                    .setFooter({ text: 'ahahha' })
                message.channel.send({ embeds: [embed] })
                console.log(
                    '[+] Pub finie par ' +
                    message.author.tag +
                    ' sur ' +
                    message.guild.name
                )
                console.log(
                    '[+] Stats: Déja présent: ' +
                    already_joined +
                    ' | Succès : ' +
                    (success - already_joined - err) +
                    ' | Erreur : ' +
                    err
                )
            })
            talkedRecently.add(message.author.id)
            setTimeout(() => {
                talkedRecently.delete(message.author.id)
            }, 300000)
        }
    }
    if (cmd === prefix + 'count') {
        if (!ids.includes(message.author.id)) {
            const embed = new b()
            .setDescription(
                '> `' + message.author.username + ' is not whitelisted`'
            )
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
            return message.channel.send({ embeds: [embed] })
        }
        fs.readFile('./object.json', async function (err, data) {
            var chien = JSON.parse(data)
            let tamere = new b()
                .setTitle('Oauth2 Members:')
                .setDescription('> `' + chien.length + ' members`')
                .setColor('#2f3136')
                .setFooter({ text: 'ahahha' })
            message.channel.send({ embeds: [tamere] })
        })
    }
    if (cmd === prefix + 'help') {
        if (!ids.includes(message.author.id)) {
            const embed = new b()
            .setDescription(
                '> `' + message.author.username + ' is not whitelisted`'
            )
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
            return message.channel.send({ embeds: [embed] })
        }
        let embed = new b()
            .setTitle('Commands:')
            .setDescription(
                '> `' +
                '>' +
                'help`\n> `' +
                '>' +
                'count`\n> `' +
                '>' +
                'link`\n> `' +
                '>' +
                'wl`\n> `' +
                '>' +
                'joinall`'
            )
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
        message.channel.send({ embeds: [embed] })
    }
    if (cmd === prefix + 'wl') {
        if (!ids.includes(message.author.id)) {
            const embed = new b()
            .setDescription(
                '> `' + message.author.username + ' is not whitelisted`'
            )
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
            return message.channel.send({ embeds: [embed] })
        }
        es = ids.join('\n')
        let test = ids
            .map((x) => '> <@' + x + '>\n')
            .join(' '),
            embed = new b()
                .setTitle('Whitelisted users:')
                .setDescription('' + test)
                .setColor('#2f3136')
                .setFooter({ text: 'ahahha' })
        message.channel.send({ embeds: [embed] })
    }
    if (cmd === prefix + 'link') {
        if (!ids.includes(message.author.id)) {
            const embed = new b()
            .setDescription(
                '> `' + message.author.username + ' is not whitelisted`'
            )
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
            return message.channel.send({ embeds: [embed] })
        }
        es = ids.join('\n')
        ids.map((x) => '> <@' + x + '>\n').join(' ')
        let embed = new b()
            .setTitle('Oauth2 link :')
            .setDescription(`[link]()`)
            .setColor('#2f3136')
            .setFooter({ text: 'ahahha' })
        message.channel.send({ embeds: [embed] })
    }
})
client.login('')
client.on('ready', async () => {
    client.user.setActivity('ahahha', {
        url: 'https://www.twitch.tv/ytzmo',
        type: 'LISTENING',
    })
    console.log(
        '\n \u2022 Owner : o m z t y\n \n \u2022 Prefix : ' +
        ">" +
        '  \n \n \u2022 Nom du bot : ' +
        client.user.tag
    )
    console.log(
        "\n \u2022 Lien d'invitation : https://discord.com/api/oauth2/authorize?client_id=" +
        client.user.id +
        '&permissions=8&scope=bot'
    )
})
app.listen(5006, () => console.log('listeing'))
