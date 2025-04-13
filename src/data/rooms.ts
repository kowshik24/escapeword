import { Room } from '@/types';

export const rooms: Room[] = [
  {
    id: 'egypt',
    name: 'Ancient Egypt',
    theme: 'egypt',
    description: 'Escape the pyramid before time runs out!',
    timeLimit: 600,
    background: '/images/rooms/egypt.jpg',
    ambient: '/sounds/egypt-ambient.mp3',
    puzzles: [
      {
        id: 'egypt-1',
        type: 'unscramble',
        question: 'HAROPA (Hint: Egyptian King)',
        answer: 'PHARAOH',
        hints: ['Ruler of ancient Egypt', 'Starts with P'],
        points: 100
      },
      {
        id: 'egypt-2',
        type: 'riddle',
        question: 'I am tall when I am young, and short when I am old. What am I?',
        answer: 'CANDLE',
        hints: ['I give light', 'I melt'],
        points: 150
      },
      {
        id: 'egypt-3',
        type: 'word-search',
        question: 'Find the hidden word: SPHINX\n★ ◆ S ■ ◇ P ● H ○ I ♦ N ▲ X ♥',
        answer: 'SPHINX',
        hints: ['Look for capital letters', 'Mythical creature'],
        points: 200
      },
      {
        id: 'egypt-4',
        type: 'code',
        question: 'Solve the hieroglyphic code: 13-5-19-1-12\n(A=1, B=2, ..., Z=26)',
        answer: 'MAGIC',
        hints: ['Each number represents a letter', 'Starts with M'],
        points: 250
      },
      {
        id: 'egypt-5',
        type: 'math-word',
        question: 'If the Great Pyramid has 2,303,200 blocks and each side has 230,400 blocks, how many blocks are on one side?',
        answer: '230400',
        hints: ['Divide total blocks by 4', 'Look at the question carefully'],
        points: 300
      },
      {
        id: 'egypt-6',
        type: 'riddle',
        question: 'What has a heart that doesn’t beat?',
        answer: 'ARTICHOKE',
        hints: ['It\'s a vegetable', 'Starts with A'],
        points: 350
      },
      {
        id: 'egypt-7',
        type: 'code',
        question: 'Decode the message: 20-9-18-9-12-5-14-19\n(A=1, B=2, ..., Z=26)',
        answer: 'TUTANKHAMUN',
        hints: ['Each number represents a letter', 'Famous pharaoh'],
        points: 400
      },
      {
        id: 'egypt-8',
        type: 'math-word',
        question: 'If the Nile River is 4,135 miles long and the Great Pyramid is 455 feet tall, what is the difference in their lengths?',
        answer: '4135',
        hints: ['Subtract the smaller number from the larger one', 'Answer is in miles'],
        points: 450
      },
      {
        id: 'egypt-9',
        type: 'riddle',
        question: 'What gets wetter the more it dries?',
        answer: 'TOWEL',
        hints: ['It\'s something you use', 'Starts with T'],
        points: 500
      },
      {
        id: 'egypt-10',
        type: 'code',
        question: 'Solve the anagram: RACECAR\nWhat word can you make from these letters?',
        answer: 'RACECAR',
        hints: ['It\'s a palindrome', 'Starts with R'],
        points: 550
      }
    ]
  },
  {
    id: 'space',
    name: 'Space Station',
    theme: 'space',
    description: 'Fix the malfunctioning space station systems!',
    timeLimit: 480,
    background: '/images/rooms/space.jpg',
    ambient: '/sounds/space-ambient.mp3',
    puzzles: [
      {
        id: 'space-1',
        type: 'code',
        question: 'Debug the airlock code: OXGN_LVLS = "LOW"\nWhat should it be to open?',
        answer: 'HIGH',
        hints: ['Opposite of low', 'Safe oxygen level'],
        points: 100
      },
      {
        id: 'space-2',
        type: 'math-word',
        question: 'If each star gives 5 units of power, and we need 35 units total, how many stars do we need?',
        answer: '7',
        hints: ['Divide total by units per star', '35 ÷ 5'],
        points: 150
      },
      {
        id: 'space-3',
        type: 'code',
        question: 'Fix the gravity control: GRAVITY = "OFF"\nWhat should it be to turn on?',
        answer: 'ON',
        hints: ['Opposite of off', 'Turn it on'],
        points: 200
      },
      {
        id: 'space-4',
        type: 'code',
        question: 'Repair the life support: LIFE_SUPPORT = "FAIL"\nWhat should it be to fix?',
        answer: 'OK',
        hints: ['Synonym for good', 'Not failing'],
        points: 250
      },
      {
        id: 'space-5',
        type: 'code',
        question: 'Activate the warp drive: WARP_DRIVE = "INACTIVE"\nWhat should it be to activate?',
        answer: 'ACTIVE',
        hints: ['Opposite of inactive', 'Turn it on'],
        points: 300
      },
      {
        id: 'space-6',
        type: 'code',
        question: 'Fix the shield generator: SHIELD = "DOWN"\nWhat should it be to raise?',
        answer: 'UP',
        hints: ['Opposite of down', 'Raise it'],
        points: 350
      },
      {
        id: 'space-7',
        type: 'code',
        question: 'Repair the communication system: COMM = "BROKEN"\nWhat should it be to fix?',
        answer: 'FIXED',
        hints: ['Synonym for repaired', 'Not broken'],
        points: 400
      },
      {
        id: 'space-8',
        type: 'code',
        question: 'Activate the engines: ENGINES = "OFF"\nWhat should it be to turn on?',
        answer: 'ON',
        hints: ['Opposite of off', 'Turn it on'],
        points: 450
      },
      {
        id: 'space-9',
        type: 'code',
        question: 'Fix the navigation system: NAV = "ERROR"\nWhat should it be to fix?',
        answer: 'FIXED',
        hints: ['Synonym for repaired', 'Not an error'],
        points: 500
      },
      {
        id: 'space-10',
        type: 'code',
        question: 'Activate the life support: LIFE = "OFF"\nWhat should it be to turn on?',
        answer: 'ON',
        hints: ['Opposite of off', 'Turn it on'],
        points: 550
      }
    ]
  },
  {
    id: 'haunted',
    name: 'Haunted Mansion',
    theme: 'haunted',
    description: 'Escape the spooky mansion before midnight!',
    timeLimit: 540,
    background: '/images/rooms/haunted.jpg',
    ambient: '/sounds/haunted-ambient.mp3',
    puzzles: [
      {
        id: 'haunted-1',
        type: 'anagram',
        question: 'Rearrange: GHOST ROOM',
        answer: 'MOST GHOR',
        hints: ['Think about fear', 'Scared feeling'],
        points: 100
      },
      {
        id: 'haunted-2',
        type: 'fill-blanks',
        question: 'Complete the spell: AB__ CA__ BR__',
        answer: 'ABRA CADA BRA',
        hints: ['Magic words', 'Classic magician phrase'],
        points: 150
      },
      {
        id: 'haunted-3',
        type: 'riddle',
        question: 'What has a heart that doesn’t beat?',
        answer: 'ARTICHOKE',
        hints: ['Not alive', 'Vegetable'],
        points: 200
      },
      {
        id: 'haunted-4',
        type: 'code',
        question: 'Unlock the door: 2 + 2 = 4\nWhat should it be?',
        answer: 'FISH',
        hints: ['Think about fish', 'What do you get when you put 2 and 2 together?'],
        points: 250
      },
      {
        id: 'haunted-5',
        type: 'word-search',
        question: 'Find the hidden words: GHOST, SKELETON, WITCH',
        answer: 'GHOST SKELETON WITCH',
        hints: ['Supernatural creatures', 'Halloween themes'],
        points: 300
      },
      {
        id: 'haunted-6',
        type: 'anagram',
        question: 'Unscramble: EATD',
        answer: 'DATE',
        hints: ['Food', 'Something you might eat on a date'],
        points: 350
      },
      {
        id: 'haunted-7',
        type: 'riddle',
        question: 'What has many keys but can’t even open a single door?',
        answer: 'PIANO',
        hints: ['Musical instrument', 'Keys are black'],
        points: 400
      },
      {
        id: 'haunted-8',
        type: 'code',
        question: 'Unlock the door: 1 + 1 = 2\nWhat should it be?',
        answer: 'TWO',
        hints: ['Number', 'What do you get when you put 1 and 1 together?'],
        points: 450
      },
      {
        id: 'haunted-9',
        type: 'word-search',
        question: 'Find the hidden words: PUMPKIN, MOON, COSTUME',
        answer: 'PUMPKIN MOON COSTUME',
        hints: ['Halloween items', 'Things you might see or wear'],
        points: 500
      },
      {
        id: 'haunted-10',
        type: 'anagram',
        question: 'Unscramble: TACOS',
        answer: 'COAST',
        hints: ['Location', 'Where you might find a beach'],
        points: 550
      }
    ]
  }
];