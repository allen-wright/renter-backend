let Property = [
  {
    _id: '5cfadc4bf9ef01a9c83d954f',
    name: 'Some Swanky Property',
    location: '123 Fake Location Dr, San Francisco, CA, 94104',
    owner: '5cfaded5ff463088ebeca9d3',
    tenants: [
      '5cfadf3cbc3dd7055097a39e',
      '5cfadf45ca25e081e84cac3e',
      '5cfadf4acea1490d46409005',
      '5cfadf536616c2f65f57e693',
      '5cfadf5baccdffe523447391',
      '5cfadf62b190f0c2ac24ae25',
      '5cfadf68bde2ec9d06de877f',
      '5cfadf6f7cba4bd8453356c6'
    ],
    maintenanceRequests: [
      '5cfade2be5930e274d7e3c61',
      '5cfade6af070dd1388efa2cb',
      '5cfade7d69e0a7c2e15e2910'
    ],
    leaseTerms: '5cfadc71e4fe8eecce5f72cb'
  }
]

let LeaseTerms = [
  {
    _id: '5cfadc71e4fe8eecce5f72cb',
    sections: [
      {
        name: 'Terms',
        order: 1,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, vel. Amet maxime ducimus dolor necessitatibus voluptatem provident sit eum nostrum ex, facilis reiciendis ut rem consequuntur eveniet nisi quas eius.
        Ducimus dolores hic iure distinctio sed facere excepturi. Quam magnam labore explicabo eos voluptate eveniet rem ratione expedita, aliquam laudantium, consequatur optio itaque iste qui error recusandae, dolorum ipsum aperiam.
        Ullam quibusdam obcaecati accusantium nobis aliquid hic laboriosam, quo illo, delectus sunt laborum eum cumque eius vitae? Cumque magnam quasi blanditiis nam excepturi tempora quibusdam et, sunt labore consequuntur fuga?
        Illo excepturi hic maiores explicabo ducimus ratione ab quisquam nihil voluptatibus at aliquam saepe odit, qui veniam, id iusto. Atque, enim architecto sapiente adipisci reprehenderit aspernatur debitis fuga possimus libero!`,
      },
      {
        name: 'Utilities',
        order: 2,
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio consectetur fugiat aspernatur ipsam consequuntur accusamus deleniti, mollitia beatae esse adipisci accusantium harum qui iure officia facere vero eius minima reiciendis.Iusto exercitationem repellendus perferendis nisi! Ad magni repellendus facilis commodi, expedita fugit laborum molestias, atque tempora aliquam tempore, incidunt unde amet quae accusantium similique qui cumque minus sequi quo pariatur.`,
      },
      {
        name: 'Additional Fees',
        order: 3,
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab temporibus animi deleniti ad tenetur perspiciatis harum ratione? Quisquam minima ex corrupti nisi nobis omnis, facilis, fugiat assumenda vero, animi expedita?Modi dolorem a atque, recusandae qui aliquam? Ducimus, vero consequuntur? Omnis a, voluptatem molestias similique delectus ea odit modi tenetur reiciendis ullam totam doloremque molestiae accusantium placeat excepturi ad eligendi.`,
      },
      {
        name: 'Pets',
        order: 4,
        content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio nemo dolorem neque porro, alias vero cupiditate ratione assumenda nihil asperiores aperiam quod hic sequi exercitationem voluptatum, voluptatem incidunt minus ducimus?`,
      },
      {
        name: 'Guests',
        order: 5,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis molestias ad accusantium maiores eos quaerat dicta itaque quas atque est qui iste dolore assumenda, ducimus temporibus, ab magni soluta laudantium?Voluptatem rerum unde enim architecto quas libero quod quo quaerat iste. Laboriosam omnis non distinctio eveniet totam. Optio, sunt magnam inventore eaque corporis sapiente eius! Voluptatum dignissimos maiores quae! Iusto!`,
      },
      {
        name: 'Early Termination',
        order: 6,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quas nihil accusamus harum doloribus earum dicta, sequi, blanditiis iste iure facere commodi voluptatum ducimus eos incidunt recusandae, vitae consequatur omnis?Aspernatur iste fuga nam eveniet quam illum perspiciatis dolor dicta quo doloribus nihil deserunt autem quis ut, minus illo itaque, sit beatae suscipit tempore eius iusto. Natus nemo impedit odio.`,
      }
    ],
    property: '5cfadc4bf9ef01a9c83d954f',
  }
]

let MaintenanceRequest = [
  {
    _id: '5cfade2be5930e274d7e3c61',
    senderId: '5cfadf3cbc3dd7055097a39e',
    property: '5cfadc4bf9ef01a9c83d954f',
    chat: '5cfadec19bcdb34653086af5',
    request: `The washing machine is broken.`,
    status: 'In Progress',
    completionEstimate: '2019-6-17',
    completionDate: null,
    notes: 'Maintenance needs to purchase an additional part - may take an additional few days.'
  },
  {
    _id: '5cfade6af070dd1388efa2cb',
    senderId: '5cfadf45ca25e081e84cac3e',
    property: '5cfadc4bf9ef01a9c83d954f',
    chat: null,
    request: `The bathtub is draining slowly.`,
    status: 'Requested',
    completionEstimate: null,
    completionDate: null,
    notes: null
  },
  {
    _id: '5cfade7d69e0a7c2e15e2910',
    senderId: '5cfadf4acea1490d46409005',
    property: '5cfadc4bf9ef01a9c83d954f',
    chat: null,
    request: `There is no hot water coming from the shower.`,
    status: 'Completed',
    completionEstimate: null,
    completionDate: null,
    notes: 'Maintenance replaced the hot water heater.'
  }
]

let Chat = [
  {
    _id: '5cfadec19bcdb34653086af5',
    tenant: '5cfadf3cbc3dd7055097a39e',
    maintenanceRequest: '5cfade2be5930e274d7e3c61',
    property: '5cfadc4bf9ef01a9c83d954f',
    subject: 'Washing machine not working..',
    messages: [
      {
        senderId: '5cfadf3cbc3dd7055097a39e',
        content: 'Hi - I just wanted to let you know that the washing machine in my unit is broken. Do you happen to know when it might be looked at?'
      },
      {
        senderId: '5cfadf2e3e13f57bc1213f17',
        content: 'Hi Clementine - I can have the maintenance look at it this Wednesday. Do we have your authorization to enter the unit if you are not available?'
      },
      {
        senderId: '5cfadf3cbc3dd7055097a39e',
        content: 'Absolutely - thank you very much!'
      },
    ]
  },
  {
    _id: '5cfae394d0e01ec61ec92aac',
    tenant: '5cfadf4acea1490d46409005',
    maintenanceRequest: null,
    property: '5cfadc4bf9ef01a9c83d954f',
    subject: 'My neighbor making too much noise.',
    messages: [
      {
        senderId: '5cfadf4acea1490d46409005',
        content: 'I wanted to register a noise complaint - the people in unit 208 make way too much noise, and are often partying until 2AM on weekdays. Can you please ask them to be more respectful of other tenants?'
      },
      {
        senderId: '5cfadf2e3e13f57bc1213f17',
        content: `Hi Chelsey - I'm sorry you've had this experience. I've received other complaints about this tenant, and I will have a conversation with them.`
      },
      {
        senderId: '5cfadf4acea1490d46409005',
        content: 'Okay, thank you.'
      },
    ]
  },
  {
    _id: '5cfae60d628e26e17343aef7',
    tenant: '5cfadf5baccdffe523447391',
    maintenanceRequest: null,
    property: '5cfadc4bf9ef01a9c83d954f',
    subject: 'Noise complaints...',
    messages: [
      {
        senderId: '5cfadf2e3e13f57bc1213f17',
        content: 'Mr. Weissnat, we have received several noise complaints from other tenants. Please be sure to be mindful of the noise you are making after quiet hours.'
      },
      {
        senderId: '5cfadf5baccdffe523447391',
        content: `I'm sorry - I will try to be more mindful of my noise levels.`
      }
    ]
  }
]

let users = [
  {
    "_id": "5cfaded5ff463088ebeca9d3",
    "name": "Leanne Graham",
    "property": "5cfadc4bf9ef01a9c83d954f",
    "role": 2,
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "_id": "5cfadf2e3e13f57bc1213f17",
    "name": "Ervin Howell",
    "property": "5cfadc4bf9ef01a9c83d954f",
    "role": 2,
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
  {
    "_id": "5cfadf3cbc3dd7055097a39e",
    "name": "Test User",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "email": "test@test.com",
    "address": {
      "street": "Douglas Extension",
      "suite": "Suite 847",
      "city": "McKenziehaven",
      "zipcode": "59590-4157",
      "geo": {
        "lat": "-68.6102",
        "lng": "-47.0653"
      }
    },
    "phone": "1-463-123-4447",
    "website": "ramiro.info",
    "company": {
      "name": "Romaguera-Jacobson",
      "catchPhrase": "Face to face bifurcated interface",
      "bs": "e-enable strategic applications"
    }
  },
  {
    "_id": "5cfadf45ca25e081e84cac3e",
    "name": "Patricia Lebsack",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org",
    "address": {
      "street": "Hoeger Mall",
      "suite": "Apt. 692",
      "city": "South Elvis",
      "zipcode": "53919-4257",
      "geo": {
        "lat": "29.4572",
        "lng": "-164.2990"
      }
    },
    "phone": "493-170-9623 x156",
    "website": "kale.biz",
    "company": {
      "name": "Robel-Corkery",
      "catchPhrase": "Multi-tiered zero tolerance productivity",
      "bs": "transition cutting-edge web services"
    }
  },
  {
    "_id": "5cfadf4acea1490d46409005",
    "name": "Chelsey Dietrich",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca",
    "address": {
      "street": "Skiles Walks",
      "suite": "Suite 351",
      "city": "Roscoeview",
      "zipcode": "33263",
      "geo": {
        "lat": "-31.8129",
        "lng": "62.5342"
      }
    },
    "phone": "(254)954-1289",
    "website": "demarco.info",
    "company": {
      "name": "Keebler LLC",
      "catchPhrase": "User-centric fault-tolerant solution",
      "bs": "revolutionize end-to-end systems"
    }
  },
  {
    "_id": "5cfadf536616c2f65f57e693",
    "name": "Mrs. Dennis Schulist",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Leopoldo_Corkery",
    "email": "Karley_Dach@jasper.info",
    "address": {
      "street": "Norberto Crossing",
      "suite": "Apt. 950",
      "city": "South Christy",
      "zipcode": "23505-1337",
      "geo": {
        "lat": "-71.4197",
        "lng": "71.7478"
      }
    },
    "phone": "1-477-935-8478 x6430",
    "website": "ola.org",
    "company": {
      "name": "Considine-Lockman",
      "catchPhrase": "Synchronised bottom-line interface",
      "bs": "e-enable innovative applications"
    }
  },
  {
    "_id": "5cfadf5baccdffe523447391",
    "name": "Kurtis Weissnat",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Elwyn.Skiles",
    "email": "Telly.Hoeger@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  },
  {
    "_id": "5cfadf62b190f0c2ac24ae25",
    "name": "Nicholas Runolfsdottir V",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Maxime_Nienow",
    "email": "Sherwood@rosamond.me",
    "address": {
      "street": "Ellsworth Summit",
      "suite": "Suite 729",
      "city": "Aliyaview",
      "zipcode": "45169",
      "geo": {
        "lat": "-14.3990",
        "lng": "-120.7677"
      }
    },
    "phone": "586.493.6943 x140",
    "website": "jacynthe.com",
    "company": {
      "name": "Abernathy Group",
      "catchPhrase": "Implemented secondary concept",
      "bs": "e-enable extensible e-tailers"
    }
  },
  {
    "_id": "5cfadf68bde2ec9d06de877f",
    "name": "Glenna Reichert",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Delphine",
    "email": "Chaim_McDermott@dana.io",
    "address": {
      "street": "Dayna Park",
      "suite": "Suite 449",
      "city": "Bartholomebury",
      "zipcode": "76495-3109",
      "geo": {
        "lat": "24.6463",
        "lng": "-168.8889"
      }
    },
    "phone": "(775)976-6794 x41206",
    "website": "conrad.com",
    "company": {
      "name": "Yost and Sons",
      "catchPhrase": "Switchable contextually-based project",
      "bs": "aggregate real-time technologies"
    }
  },
  {
    "_id": "5cfadf6f7cba4bd8453356c6",
    "name": "Clementina DuBuque",
    "role": 1,
    "property": "5cfadc4bf9ef01a9c83d954f",
    "username": "Moriah.Stanton",
    "email": "Rey.Padberg@karina.biz",
    "address": {
      "street": "Kattie Turnpike",
      "suite": "Suite 198",
      "city": "Lebsackbury",
      "zipcode": "31428-2261",
      "geo": {
        "lat": "-38.2386",
        "lng": "57.2232"
      }
    },
    "phone": "024-648-3804",
    "website": "ambrose.net",
    "company": {
      "name": "Hoeger LLC",
      "catchPhrase": "Centralized empowering task-force",
      "bs": "target end-to-end models"
    }
  },
  {
    _id: '5cfae6de1417a33b921c191f',
    name: 'Admin Guy',
    email: 'admin@admin.com',
    role: 3
  }
]

module.exports = {
  Property,
  LeaseTerms,
  MaintenanceRequest,
  Chat,
  users
};