module.exports = (message, array, client, embed, port, back) => {
    message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Docker in **Discord**",
        description: "**__ssh__** 칠 시간도 아까운 당신! 지금 당장 안즈와 함께 효과적으로 일하는거시와요!",
        fields: [
            {
                name: '\u200b',
                value: '\u200b',
            },{
            name: "첫번째 장점",
            value: "여러 명이서 도커 관리를 공유하기 때문에, 상대가 뭘 하는지 알 수 있다!"
          },
          {
            name: "두번째 장점",
            value: "**__ssh__** 를 열 필요도 없으며, 명령어도 훨씬 간단하고 단순하다!"
          },
          {
            name: "세번째 장점",
            value: "휴대폰이나 패드같은 기타 전자장비에서도\n웹에 접속만 가능하면 언제든지 도커를 관리할 수 있다!\n여행가서도 서버 관리가 OK!"
          }
        ],
        image: {
            url: 'http://thumbnail.egloos.net/700x0/http://pds21.egloos.com/pds/201903/15/00/e0072700_5c8b46cd9a5ef.png',
        },
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "가 당신에게 메세지를 보낸 날"
        }
      }
    });
    back();
}