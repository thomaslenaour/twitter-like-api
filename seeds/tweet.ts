import { Prisma } from '@prisma/client';

export const tweet: Prisma.TweetCreateManyInput[] = [
  {
    id: 'cky4et5nl000109mldf75d0nf',
    content: "J'adore cette application !",
    authorId: 'cjld2cjxh0000qzrmn831i7rn',
  },
  {
    id: 'cky4ev15b000409ml1ztke35k',
    content: 'Que pensez-vous de la série The Witcher ?',
    authorId: 'cjld2cjxh0000qzrmn831i7rn',
  },
  {
    id: 'cky4exexs000509ml8r0qhrlj',
    content: "J'adore cette série perso",
    authorId: 'cjld2cyuq0000t3rmniod1foy',
    type: 'RESPONSE',
    parentTweetId: 'cky4ev15b000409ml1ztke35k',
  },
  {
    id: 'cky4f8u5r000008l307ab76st',
    content: "Oui l'histoire est vraiment bien",
    authorId: 'cjld2cjxh0000qzrmn831i7rn',
    type: 'RESPONSE_TO_RESPONSE',
    parentResponseId: 'cky4exexs000509ml8r0qhrlj',
  },
  {
    id: 'cky4fggac000008me1i31g6nv',
    content: 'Apple est la meilleure marque du monde...',
    authorId: 'cky4c2w48000008jwcdfn16rl',
  },
  {
    id: 'cky4fixeo000108me17a7hguj',
    content: 'Zéro débat possible',
    type: 'RESPONSE',
    authorId: 'cky4c2w48000008jwcdfn16rl',
    parentTweetId: 'cky4fggac000008me1i31g6nv',
  },
  {
    id: 'cky4fkz7g000208me1lrghbu9',
    content: 'Je préfère Android perso',
    type: 'RESPONSE_TO_RESPONSE',
    parentResponseId: 'cky4fixeo000108me17a7hguj',
    authorId: 'cky4c3mvy000108jw6f7k8zry',
  },
  {
    id: 'cky4fl36x000308mehetaekka',
    content: 'Il fait grave froid en ce moment...',
    authorId: 'cjld2cyuq0000t3rmniod1foy',
  },
  {
    id: 'cky4fll54000408mehxfgacyy',
    content: "J'ai plus de dents",
    authorId: 'cky4c4ddv000208jw6g8uhtoz',
  },
];
