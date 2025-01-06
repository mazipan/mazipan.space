
type BlogItem = {
  name: string
  link: string
}

type Owner = {
  name: string
  link: string
  icon: 'github' | 'x' | 'unknown'
  avatar: string
}

type DataItem = {
  blog: BlogItem
  owner: Owner
}

type Metadata = {
  total: number
  updatedAt: string
  source: string
}

export type AwesomeSdeBlogs = {
  data: DataItem[]
  metadata: Metadata
};

export const awesomeSdeBlogs: AwesomeSdeBlogs = {
  "data": [
    {
      "blog": {
        "name": "agustinusnathaniel.com",
        "link": "https://agustinusnathaniel.com/"
      },
      "owner": {
        "name": "Agustinus Nathaniel",
        "link": "https://github.com/agustinusnathaniel",
        "icon": "github",
        "avatar": "https://unavatar.io/github/agustinusnathaniel"
      }
    },
    {
      "blog": {
        "name": "ahmadrosid.com",
        "link": "https://ahmadrosid.com/"
      },
      "owner": {
        "name": "Ahmad Rosid",
        "link": "https://github.com/ahmadrosid",
        "icon": "github",
        "avatar": "https://unavatar.io/github/ahmadrosid"
      }
    },
    {
      "blog": {
        "name": "blog.cerita-faldi.xyz",
        "link": "https://blog.cerita-faldi.xyz/"
      },
      "owner": {
        "name": "Naufaldi Rafif S",
        "link": "https://x.com/f2aldi",
        "icon": "x",
        "avatar": "https://unavatar.io/x/f2aldi"
      }
    },
    {
      "blog": {
        "name": "bryanprim.us",
        "link": "https://bryanprim.us/"
      },
      "owner": {
        "name": "Bryan Lumbantobing",
        "link": "https://x.com/bryanltobing",
        "icon": "x",
        "avatar": "https://unavatar.io/x/bryanltobing"
      }
    },
    {
      "blog": {
        "name": "fatihkalifa.com",
        "link": "https://fatihkalifa.com/en"
      },
      "owner": {
        "name": "Fatih Kalifa",
        "link": "https://github.com/pveyes",
        "icon": "github",
        "avatar": "https://unavatar.io/github/pveyes"
      }
    },
    {
      "blog": {
        "name": "gading.dev",
        "link": "https://gading.dev/id"
      },
      "owner": {
        "name": "Sutan Gading Fadhillah Nasution",
        "link": "https://github.com/gadingnst",
        "icon": "github",
        "avatar": "https://unavatar.io/github/gadingnst"
      }
    },
    {
      "blog": {
        "name": "ghora.net",
        "link": "https://ghora.net/"
      },
      "owner": {
        "name": "Aria Ghora Prabono",
        "link": "https://github.com/ariaghora",
        "icon": "github",
        "avatar": "https://unavatar.io/github/ariaghora"
      }
    },
    {
      "blog": {
        "name": "helmisatria.com",
        "link": "https://helmisatria.com/"
      },
      "owner": {
        "name": "Helmi Satria",
        "link": "https://x.com/helmisatria_",
        "icon": "x",
        "avatar": "https://unavatar.io/x/helmisatria_"
      }
    },
    {
      "blog": {
        "name": "ibam.id",
        "link": "https://ibam.id/"
      },
      "owner": {
        "name": "Ibrahim Arief",
        "link": "https://x.com/ibamarief",
        "icon": "x",
        "avatar": "https://unavatar.io/x/ibamarief"
      }
    },
    {
      "blog": {
        "name": "imrenagi.com",
        "link": "https://imrenagi.com/"
      },
      "owner": {
        "name": "Imre Nagi",
        "link": "https://x.com/imrenagi",
        "icon": "x",
        "avatar": "https://unavatar.io/x/imrenagi"
      }
    },
    {
      "blog": {
        "name": "indrazm.com",
        "link": "https://www.indrazm.com/"
      },
      "owner": {
        "name": "Indra Zulfi",
        "link": "https://x.com/indrazulfi",
        "icon": "x",
        "avatar": "https://unavatar.io/x/indrazulfi"
      }
    },
    {
      "blog": {
        "name": "jackyef.com",
        "link": "https://jackyef.com/"
      },
      "owner": {
        "name": "Jacky Efendi",
        "link": "https://x.com/jackyef__",
        "icon": "x",
        "avatar": "https://unavatar.io/x/jackyef__"
      }
    },
    {
      "blog": {
        "name": "jafaraziz.com",
        "link": "https://jafaraziz.com/"
      },
      "owner": {
        "name": "Jafar Aziz",
        "link": "https://x.com/jfrAziz",
        "icon": "x",
        "avatar": "https://unavatar.io/x/jfrAziz"
      }
    },
    {
      "blog": {
        "name": "jurnalanas.com",
        "link": "https://www.jurnalanas.com/"
      },
      "owner": {
        "name": "Anas Muhammad Nasrurrohman",
        "link": "https://x.com/oianas_",
        "icon": "x",
        "avatar": "https://unavatar.io/x/oianas_"
      }
    },
    {
      "blog": {
        "name": "mazipan.space",
        "link": "https://www.mazipan.space/"
      },
      "owner": {
        "name": "Irfan Maulana",
        "link": "https://github.com/mazipan",
        "icon": "github",
        "avatar": "https://unavatar.io/github/mazipan"
      }
    },
    {
      "blog": {
        "name": "nayakayoga.com",
        "link": "https://nayakayoga.com/id"
      },
      "owner": {
        "name": "Nayaka Yoga Pradipta",
        "link": "https://x.com/nayakayp",
        "icon": "x",
        "avatar": "https://unavatar.io/x/nayakayp"
      }
    },
    {
      "blog": {
        "name": "panjigautama.com",
        "link": "https://panjigautama.com/"
      },
      "owner": {
        "name": "Panji Gautama",
        "link": "https://x.com/rhapsodixx",
        "icon": "x",
        "avatar": "https://unavatar.io/x/rhapsodixx"
      }
    },
    {
      "blog": {
        "name": "praditautama.com",
        "link": "https://www.praditautama.com/"
      },
      "owner": {
        "name": "Pradita Utama",
        "link": "https://x.com/praditautama",
        "icon": "x",
        "avatar": "https://unavatar.io/x/praditautama"
      }
    },
    {
      "blog": {
        "name": "rin.rocks",
        "link": "https://www.rin.rocks/"
      },
      "owner": {
        "name": "r17x",
        "link": "https://x.com/__r17x",
        "icon": "x",
        "avatar": "https://unavatar.io/x/__r17x"
      }
    },
    {
      "blog": {
        "name": "rivki.dev",
        "link": "https://rivki.dev/"
      },
      "owner": {
        "name": "Muhammad Rivki",
        "link": "https://github.com/mikqi",
        "icon": "github",
        "avatar": "https://unavatar.io/github/mikqi"
      }
    },
    {
      "blog": {
        "name": "sarbeh.com",
        "link": "https://www.sarbeh.com/"
      },
      "owner": {
        "name": "Ibrahim Nurul Huda",
        "link": "https://x.com/sarbeh_",
        "icon": "x",
        "avatar": "https://unavatar.io/x/sarbeh_"
      }
    },
    {
      "blog": {
        "name": "sonnylab.com",
        "link": "https://sonnylab.com/"
      },
      "owner": {
        "name": "Sonny Lazuardi",
        "link": "https://x.com/sonnylazuardi",
        "icon": "x",
        "avatar": "https://unavatar.io/x/sonnylazuardi"
      }
    },
    {
      "blog": {
        "name": "santrikoding.com",
        "link": "https://santrikoding.com/"
      },
      "owner": {
        "name": "Fika Ridaul Maulayya",
        "link": "https://github.com/maulayyacyber",
        "icon": "github",
        "avatar": "https://unavatar.io/github/maulayyacyber"
      }
    },
    {
      "blog": {
        "name": "taufiqseptryana.com",
        "link": "https://taufiqseptryana.com/"
      },
      "owner": {
        "name": "Taufiq Septryana",
        "link": "https://x.com/qepo_s",
        "icon": "x",
        "avatar": "https://unavatar.io/x/qepo_s"
      }
    },
    {
      "blog": {
        "name": "theodorusclarence.com",
        "link": "https://theodorusclarence.com/"
      },
      "owner": {
        "name": "Theodorus Clarence",
        "link": "https://x.com/th_clarence",
        "icon": "x",
        "avatar": "https://unavatar.io/x/th_clarence"
      }
    },
    {
      "blog": {
        "name": "The 10% Engineer",
        "link": "https://newsletter.lwastuargo.com/"
      },
      "owner": {
        "name": "Listiarso Wastuargo Gogo",
        "link": "https://x.com/lwastuargo",
        "icon": "x",
        "avatar": "https://unavatar.io/x/lwastuargo"
      }
    },
    {
      "blog": {
        "name": "yehezgun.com",
        "link": "https://yehezgun.com/"
      },
      "owner": {
        "name": "Yehezkiel Gunawan",
        "link": "https://x.com/YehezGun",
        "icon": "x",
        "avatar": "https://unavatar.io/x/YehezGun"
      }
    },
    {
      "blog": {
        "name": "zainfathoni.com",
        "link": "https://www.zainfathoni.com/"
      },
      "owner": {
        "name": "Zain Fathoni",
        "link": "https://x.com/zainfathoni",
        "icon": "x",
        "avatar": "https://unavatar.io/x/zainfathoni"
      }
    },
    {
      "blog": {
        "name": "zakiego.com",
        "link": "https://zakiego.com/"
      },
      "owner": {
        "name": "M. Zakiyuddin Munziri Zakiego",
        "link": "https://x.com/zakiego",
        "icon": "x",
        "avatar": "https://unavatar.io/x/zakiego"
      }
    }
  ],
  "metadata": {
    "total": 29,
    "updatedAt": "2025-01-06T04:48:31.851Z",
    "source": "https://github.com/mazipan/awesome-sde-id-blogs"
  }
}