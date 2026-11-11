type Pair = readonly [string, string];

/** A client project. Pairs are [English, Arabic]; the first image is the cover. */
export type Project = {
  id: string;
  name: Pair;
  type: Pair;
  city: Pair;
  text: Pair;
  logo: { src: string; h: number; w?: number };
  images: readonly { src: string; alt: Pair }[];
};

/**
 * Built-in projects: used when the database can't be reached (and the data it was seeded from).
 * Projects are managed in the admin dashboard.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "mumsie-bakery",
    name: ["Mumsie Bakery", "مخبز ممزي"],
    type: ["Bakery", "مخبز"],
    city: ["Dammam", "الدمام"],
    text: [
      "Hand-thrown cups in a soft pink glaze, lettered with the Mumsie logo and finished with sculpted clay handles.",
      "لمخبز ممزي سوّينا أكواب وردية تفتح النفس، كل واحد منها مشكّل باليد وعليه شعارهم، ومقابضها من الطين معقودة على شكل فيونكة. تشرب فيها قهوتك وتحس إن الصبح صار أحلى.",
    ],
    logo: { src: "/clients/mumsie.svg", w: 87, h: 24 },
    images: [{ src: "/img/work-mumsie.jpg", alt: ["Pink-glazed Mumsie Bakery cups laid out on linen", "أكواب مخبز ممزي بطلاء وردي على قماش"] }],
  },
  {
    id: "peek-a-brew",
    name: ["Peek a Brew", "بيك أَ برو"],
    type: ["Café", "مقهى"],
    city: ["Khobar", "الخبر"],
    text: [
      "Wheel-thrown cups stamped with the Peek a Brew logo in green, with “Have a brew-tiful day!” inside the rim and a pair of eyes peeking up from the bottom.",
      "أكواب بيك أَ برو وراها سالفة حلوة: من برّا ختم شعارهم بالأخضر، ومن داخل على الحافة «\u2068Have a brew-tiful day!\u2069» تصبّح عليك، ولا خلّصت قهوتك تلقى عيونين يطالعونك من قاع الكوب. يعني لازم تخلّصها!",
    ],
    logo: { src: "/clients/hands.svg", w: 30, h: 34 },
    images: [
      { src: "/img/work-peekabrew-1.jpg", alt: ["Peek a Brew cups with the stamped green logo on a shelf", "أكواب Peek a Brew بختم الشعار الأخضر على رف"] },
      { src: "/img/work-peekabrew-2.jpg", alt: ["Looking into Peek a Brew cups: the rim message and the peeking eyes", "من داخل أكواب Peek a Brew: العبارة على الحافة والعينان في القاع"] },
    ],
  },
];
