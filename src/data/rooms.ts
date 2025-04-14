import { Room, PowerUp, Post } from '@/types';

const commonPowerUps: PowerUp[] = [
  {
    type: 'extraTime',
    duration: 60,
    description: 'Add 60 seconds to the timer'
  },
  {
    type: 'doublePoints',
    duration: 120,
    multiplier: 2,
    description: 'Double points for 2 minutes'
  },
  {
    type: 'extraHint',
    description: 'Get an extra hint'
  },
  {
    type: 'skipPuzzle',
    description: 'Skip the current puzzle'
  }
];

// Sample room discussions
const egyptDiscussions: Post[] = [
  {
    id: 'egypt-post-1',
    roomId: 'egypt',
    userId: 'user-2',
    username: 'PyramidExplorer',
    title: 'Stuck on the Hieroglyphics!',
    content: 'That code with numbers=letters is tricky. Remember each number corresponds to alphabet position. Super clever puzzle!',
    createdAt: Date.now() - 7200000,
    likes: ['user-3', 'user-4'],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        username: 'SphinxRiddler',
        content: 'The key is to write out the alphabet with numbers first: A=1, B=2, etc. Makes it much easier!',
        createdAt: Date.now() - 3600000,
        likes: ['user-2']
      }
    ]
  },
  {
    id: 'egypt-post-2',
    roomId: 'egypt',
    userId: 'user-5',
    username: 'TombRaider',
    title: 'Math Puzzle Strategy',
    content: 'For the Great Pyramid blocks puzzle, focus on what the question is actually asking. Sometimes the answer is right there!',
    createdAt: Date.now() - 172800000,
    likes: ['user-2', 'user-6'],
    comments: []
  }
];

const spaceDiscussions: Post[] = [
  {
    id: 'space-post-1',
    roomId: 'space',
    userId: 'user-4',
    username: 'SpaceEngineer',
    title: 'System Status Pattern',
    content: 'Notice how many of the system repair puzzles follow a pattern? Think about opposites: OFF->ON, DOWN->UP, etc.',
    createdAt: Date.now() - 86400000,
    likes: ['user-2', 'user-5', 'user-6'],
    comments: [
      {
        id: 'comment-2',
        userId: 'user-6',
        username: 'StarNavigator',
        content: 'Great observation! Also helps to think about what state a working system should be in.',
        createdAt: Date.now() - 43200000,
        likes: ['user-4']
      }
    ]
  }
];

const hauntedDiscussions: Post[] = [
  {
    id: 'haunted-post-1',
    roomId: 'haunted',
    userId: 'user-7',
    username: 'GhostHunter',
    title: 'Piano Riddle Help',
    content: 'Loving these spooky riddles! The one about keys is so clever - think about musical instruments!',
    createdAt: Date.now() - 259200000,
    likes: ['user-8', 'user-9'],
    comments: [
      {
        id: 'comment-3',
        userId: 'user-8',
        username: 'MidnightExplorer',
        content: 'The Halloween-themed word searches are fun too! Really fits the mansion atmosphere.',
        createdAt: Date.now() - 216000000,
        likes: ['user-7']
      }
    ]
  },
  {
    id: 'haunted-post-2',
    roomId: 'haunted',
    userId: 'user-9',
    username: 'SpookyScholar',
    title: 'Magic Word Pattern',
    content: 'For the spell completion puzzle, think of the most famous magic words ever. It\'s a classic!',
    createdAt: Date.now() - 345600000,
    likes: ['user-7', 'user-8'],
    comments: []
  }
];

export const rooms: Room[] = [
  {
    id: 'egypt',
    name: 'Ancient Egypt',
    theme: 'egypt',
    description: 'Escape the pyramid before time runs out!',
    difficulty: 'medium',
    timeLimit: 600,
    background: '/images/rooms/egypt.jpg',
    ambient: '/sounds/egypt-ambient.mp3',
    baseScore: 1000,
    availablePowerUps: commonPowerUps,
    achievements: [
      {
        id: 'egypt-speedrun',
        name: 'Pyramid Speedrunner',
        description: 'Complete the Egypt room in under 5 minutes',
        condition: 'timeRemaining > 300',
        reward: 500
      },
      {
        id: 'egypt-perfect',
        name: 'Perfect Hieroglyphics',
        description: 'Complete all puzzles without using hints',
        condition: 'hintsUsed === 0',
        reward: 1000
      }
    ],
    puzzles: [
      {
        id: 'egypt-1',
        type: 'unscramble',
        difficulty: 'easy',
        question: 'HAROPA (Hint: Egyptian King)',
        answer: 'PHARAOH',
        hints: ['Ruler of ancient Egypt', 'Starts with P'],
        points: 100,
        timeBonus: 50
      },
      {
        id: 'egypt-2',
        type: 'riddle',
        difficulty: 'medium',
        question: 'I am tall when I am young, and short when I am old. What am I?',
        answer: 'CANDLE',
        hints: ['I give light', 'I melt'],
        points: 150,
        timeBonus: 75
      },
      {
        id: 'egypt-3',
        type: 'word-search',
        difficulty: 'hard',
        question: 'Find the hidden word: SPHINX\n★ ◆ S ■ ◇ P ● H ○ I ♦ N ▲ X ♥',
        answer: 'SPHINX',
        hints: ['Look for capital letters', 'Mythical creature'],
        points: 200,
        timeBonus: 100
      },
      {
        id: 'egypt-4',
        type: 'code',
        difficulty: 'hard',
        question: 'Solve the hieroglyphic code: 13-5-19-1-12\n(A=1, B=2, ..., Z=26)',
        answer: 'MAGIC',
        hints: ['Each number represents a letter', 'Starts with M'],
        points: 250,
        timeBonus: 125
      },
      {
        id: 'egypt-5',
        type: 'math-word',
        difficulty: 'medium',
        question: 'If the Great Pyramid has 2,303,200 blocks and each side has 230,400 blocks, how many blocks are on one side?',
        answer: '230400',
        hints: ['Divide total blocks by 4', 'Look at the question carefully'],
        points: 300,
        timeBonus: 150
      },
      {
        id: 'egypt-6',
        type: 'riddle',
        difficulty: 'hard',
        question: 'What has a heart that doesn’t beat?',
        answer: 'ARTICHOKE',
        hints: ['It\'s a vegetable', 'Starts with A'],
        points: 350,
        timeBonus: 175
      },
      {
        id: 'egypt-7',
        type: 'code',
        difficulty: 'hard',
        question: 'Decode the message: 20-9-18-9-12-5-14-19\n(A=1, B=2, ..., Z=26)',
        answer: 'TUTANKHAMUN',
        hints: ['Each number represents a letter', 'Famous pharaoh'],
        points: 400,
        timeBonus: 200
      },
      {
        id: 'egypt-8',
        type: 'math-word',
        difficulty: 'medium',
        question: 'If the Nile River is 4,135 miles long and the Great Pyramid is 455 feet tall, what is the difference in their lengths?',
        answer: '4135',
        hints: ['Subtract the smaller number from the larger one', 'Answer is in miles'],
        points: 450,
        timeBonus: 225
      },
      {
        id: 'egypt-9',
        type: 'riddle',
        difficulty: 'easy',
        question: 'What gets wetter the more it dries?',
        answer: 'TOWEL',
        hints: ['It\'s something you use', 'Starts with T'],
        points: 500,
        timeBonus: 250
      },
      {
        id: 'egypt-10',
        type: 'code',
        difficulty: 'medium',
        question: 'Solve the anagram: RACECAR\nWhat word can you make from these letters?',
        answer: 'RACECAR',
        hints: ['It\'s a palindrome', 'Starts with R'],
        points: 550,
        timeBonus: 275
      }
    ],
    discussions: egyptDiscussions
  },
  {
    id: 'space',
    name: 'Space Station',
    theme: 'space',
    description: 'Fix the malfunctioning space station systems!',
    difficulty: 'hard',
    timeLimit: 480,
    background: '/images/rooms/space.jpg',
    ambient: '/sounds/space-ambient.mp3',
    baseScore: 1500,
    availablePowerUps: [
      ...commonPowerUps,
      {
        type: 'extraTime',
        duration: 120,
        description: 'Emergency Power: Add 2 minutes to the timer'
      }
    ],
    achievements: [
      {
        id: 'space-hero',
        name: 'Space Hero',
        description: 'Save the station with more than 3 minutes remaining',
        condition: 'timeRemaining > 180',
        reward: 750
      },
      {
        id: 'space-master-engineer',
        name: 'Master Engineer',
        description: 'Fix all systems without any wrong attempts',
        condition: 'wrongAttempts === 0',
        reward: 1000
      }
    ],
    puzzles: [
      {
        id: 'space-1',
        type: 'code',
        difficulty: 'medium',
        question: 'Debug the airlock code: OXGN_LVLS = "LOW"\nWhat should it be to open?',
        answer: 'HIGH',
        hints: ['Opposite of low', 'Safe oxygen level'],
        points: 100,
        timeBonus: 75
      },
      {
        id: 'space-2',
        type: 'math-word',
        difficulty: 'easy',
        question: 'If each star gives 5 units of power, and we need 35 units total, how many stars do we need?',
        answer: '7',
        hints: ['Divide total by units per star', '35 ÷ 5'],
        points: 150,
        timeBonus: 50
      },
      {
        id: 'space-3',
        type: 'code',
        difficulty: 'medium',
        question: 'Fix the gravity control: GRAVITY = "OFF"\nWhat should it be to turn on?',
        answer: 'ON',
        hints: ['Opposite of off', 'Turn it on'],
        points: 200,
        timeBonus: 100
      },
      {
        id: 'space-4',
        type: 'code',
        difficulty: 'hard',
        question: 'Repair the life support: LIFE_SUPPORT = "FAIL"\nWhat should it be to fix?',
        answer: 'OK',
        hints: ['Synonym for good', 'Not failing'],
        points: 250,
        timeBonus: 125
      },
      {
        id: 'space-5',
        type: 'code',
        difficulty: 'hard',
        question: 'Activate the warp drive: WARP_DRIVE = "INACTIVE"\nWhat should it be to activate?',
        answer: 'ACTIVE',
        hints: ['Opposite of inactive', 'Turn it on'],
        points: 300,
        timeBonus: 150
      },
      {
        id: 'space-6',
        type: 'code',
        difficulty: 'medium',
        question: 'Fix the shield generator: SHIELD = "DOWN"\nWhat should it be to raise?',
        answer: 'UP',
        hints: ['Opposite of down', 'Raise it'],
        points: 350,
        timeBonus: 175
      },
      {
        id: 'space-7',
        type: 'code',
        difficulty: 'hard',
        question: 'Repair the communication system: COMM = "BROKEN"\nWhat should it be to fix?',
        answer: 'FIXED',
        hints: ['Synonym for repaired', 'Not broken'],
        points: 400,
        timeBonus: 200
      },
      {
        id: 'space-8',
        type: 'code',
        difficulty: 'medium',
        question: 'Activate the engines: ENGINES = "OFF"\nWhat should it be to turn on?',
        answer: 'ON',
        hints: ['Opposite of off', 'Turn it on'],
        points: 450,
        timeBonus: 225
      },
      {
        id: 'space-9',
        type: 'code',
        difficulty: 'hard',
        question: 'Fix the navigation system: NAV = "ERROR"\nWhat should it be to fix?',
        answer: 'FIXED',
        hints: ['Synonym for repaired', 'Not an error'],
        points: 500,
        timeBonus: 250
      },
      {
        id: 'space-10',
        type: 'code',
        difficulty: 'medium',
        question: 'Activate the life support: LIFE = "OFF"\nWhat should it be to turn on?',
        answer: 'ON',
        hints: ['Opposite of off', 'Turn it on'],
        points: 500,
        timeBonus: 275
      }
    ],
    discussions: spaceDiscussions
  },
  {
    id: 'haunted',
    name: 'Haunted Mansion',
    theme: 'haunted',
    description: 'Escape the spooky mansion before midnight!',
    difficulty: 'easy',
    timeLimit: 540,
    background: '/images/rooms/haunted.jpg',
    ambient: '/sounds/haunted-ambient.mp3',
    baseScore: 800,
    availablePowerUps: [
      ...commonPowerUps,
      {
        type: 'doublePoints',
        duration: 180,
        multiplier: 3,
        description: 'Ghost Power: Triple points for 3 minutes'
      }
    ],
    achievements: [
      {
        id: 'haunted-brave',
        name: 'Fearless Explorer',
        description: 'Complete the mansion without using any power-ups',
        condition: 'powerUpsUsed === 0',
        reward: 1000
      },
      {
        id: 'haunted-swift',
        name: 'Swift Ghost',
        description: 'Complete all puzzles in under 7 minutes',
        condition: 'timeRemaining > 120',
        reward: 500
      }
    ],
    puzzles: [
      {
        id: 'haunted-1',
        type: 'anagram',
        difficulty: 'easy',
        question: 'Rearrange: GHOST ROOM',
        answer: 'MOST GHOR',
        hints: ['Think about fear', 'Scared feeling'],
        points: 100,
        timeBonus: 25
      },
      {
        id: 'haunted-2',
        type: 'fill-blanks',
        difficulty: 'medium',
        question: 'Complete the spell: AB__ CA__ BR__',
        answer: 'ABRA CADA BRA',
        hints: ['Magic words', 'Classic magician phrase'],
        points: 150,
        timeBonus: 50
      },
      {
        id: 'haunted-3',
        type: 'riddle',
        difficulty: 'medium',
        question: 'What has a heart that doesn’t beat?',
        answer: 'ARTICHOKE',
        hints: ['Not alive', 'Vegetable'],
        points: 200,
        timeBonus: 75
      },
      {
        id: 'haunted-4',
        type: 'code',
        difficulty: 'hard',
        question: 'Unlock the door: 2 + 2 = 4\nWhat should it be?',
        answer: 'FISH',
        hints: ['Think about fish', 'What do you get when you put 2 and 2 together?'],
        points: 250,
        timeBonus: 100
      },
      {
        id: 'haunted-5',
        type: 'word-search',
        difficulty: 'medium',
        question: 'Find the hidden words: GHOST, SKELETON, WITCH',
        answer: 'GHOST SKELETON WITCH',
        hints: ['Supernatural creatures', 'Halloween themes'],
        points: 300,
        timeBonus: 125
      },
      {
        id: 'haunted-6',
        type: 'anagram',
        difficulty: 'easy',
        question: 'Unscramble: EATD',
        answer: 'DATE',
        hints: ['Food', 'Something you might eat on a date'],
        points: 350,
        timeBonus: 150
      },
      {
        id: 'haunted-7',
        type: 'riddle',
        difficulty: 'medium',
        question: 'What has many keys but can’t even open a single door?',
        answer: 'PIANO',
        hints: ['Musical instrument', 'Keys are black'],
        points: 400,
        timeBonus: 175
      },
      {
        id: 'haunted-8',
        type: 'code',
        difficulty: 'medium',
        question: 'Unlock the door: 1 + 1 = 2\nWhat should it be?',
        answer: 'TWO',
        hints: ['Number', 'What do you get when you put 1 and 1 together?'],
        points: 450,
        timeBonus: 200
      },
      {
        id: 'haunted-9',
        type: 'word-search',
        difficulty: 'hard',
        question: 'Find the hidden words: PUMPKIN, MOON, COSTUME',
        answer: 'PUMPKIN MOON COSTUME',
        hints: ['Halloween items', 'Things you might see or wear'],
        points: 500,
        timeBonus: 225
      },
      {
        id: 'haunted-10',
        type: 'anagram',
        difficulty: 'hard',
        question: 'Unscramble: TACOS',
        answer: 'COAST',
        hints: ['Location', 'Where you might find a beach'],
        points: 550,
        timeBonus: 250
      }
    ],
    discussions: hauntedDiscussions
  }
];