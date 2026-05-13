export type LessonItem = {
  id: string
  type: 'mcq' | 'translation' | 'listening'
  question: string
  options?: string[]
  answer: string
}


export const LESSON_BANKS: Record<string, LessonItem[]> = {
  Arabic: [
    // Module 1: Greetings & Introductions
    { id: 'a1-1', type: 'mcq', question: 'Match the meaning: "As-salamu alaykum"', options: ["how are you", "peace be upon you (hello)", "good morning", "thank you"], answer: 'peace be upon you (hello)' },
    { id: 'a1-2', type: 'mcq', question: 'Match the meaning: "Kayfa haluk?"', options: ["what's your name", "how are you", "hello", "goodbye"], answer: "how are you" },
    { id: 'a1-3', type: 'mcq', question: 'Fill in the blank: "Sabah ______" (Good morning)', options: ['al-khayr', 'al-noor', 'as-salam'], answer: 'al-khayr' },
    { id: 'a1-4', type: 'mcq', question: 'Fill in the blank to respond: "Kayfa haluk? -> Ana ______" (I am fine)', options: ['bekhair', 'shukran', 'asif'], answer: 'bekhair' },
    { id: 'a1-5', type: 'mcq', question: 'Fill in the blank: "______ jazeelan" (Thank you very much)', options: ['Shukran', 'Afwan', 'Marhaba'], answer: 'Shukran' },
    { id: 'a1-6', type: 'mcq', question: 'Rearrange into a valid phrase: haluk / Kayfa', options: ['Kayfa haluk', 'Haluk kayfa', 'Kayfa bekhair'], answer: 'Kayfa haluk' },
    { id: 'a1-7', type: 'mcq', question: 'Rearrange into a valid phrase: ismi / Ahmad (my name is Ahmad)', options: ['ismi Ahmad', 'Ahmad ismi', 'ana ismi'], answer: 'ismi Ahmad' },
    { id: 'a1-8', type: 'mcq', question: 'Translate (Basic): "Hello"', options: ['Marhaba', 'Shukran', 'Afwan'], answer: 'Marhaba' },
    { id: 'a1-9', type: 'mcq', question: 'Translate (Basic): "How are you?"', options: ['Kayfa haluk?', 'Ma ismuk?', 'Sabah al-khayr?'], answer: 'Kayfa haluk?' },
    { id: 'a1-10', type: 'listening', question: 'Which greeting matches "mar-ha-ba"?', options: ['As-salamu', 'Shukran', 'Marhaba', 'Ahlan'], answer: 'Marhaba' },
    
    // Module 2: Time, Days, Months, Routine
    { id: 'a2-1', type: 'mcq', question: 'Match the meaning: "Al-Ahad"', options: ["Sunday", "Wednesday", "Friday", "Monday"], answer: 'Sunday' },
    { id: 'a2-2', type: 'mcq', question: 'Match the meaning: "Al-Ithnayn"', options: ["Tuesday", "Monday", "Sunday", "Friday"], answer: 'Monday' },
    { id: 'a2-3', type: 'mcq', question: 'Fill in the blank: Al-yawm ______ (Today is Friday)', options: ['Al-Jum\'ah', 'Al-Ahad', 'As-Sabt'], answer: 'Al-Jum\'ah' },
    { id: 'a2-4', type: 'mcq', question: 'Fill in the blank: Ghadan ______ (Tomorrow is Tuesday)', options: ['Ath-Thulatha\'', 'Al-Ithnayn', 'Al-Arbi\'a\''], answer: 'Ath-Thulatha\'' },
    { id: 'a2-5', type: 'mcq', question: 'Fill in the blank: Ams kana ______ (Yesterday was Wednesday)', options: ['Al-Arbi\'a\'', 'Ath-Thulatha\'', 'Al-Khamis'], answer: 'Al-Arbi\'a\'' },
    { id: 'a2-6', type: 'mcq', question: 'Rearrange into a valid sentence: Al-Ithnayn / Al-yawm', options: ['Al-yawm Al-Ithnayn', 'Al-Ithnayn Al-yawm', 'Al-yawm Ams'], answer: 'Al-yawm Al-Ithnayn' },
    { id: 'a2-7', type: 'mcq', question: 'Translate: "Today is Monday"', options: ['Al-yawm Al-Ithnayn', 'Al-yawm Ath-Thulatha\'', 'Al-yawm Al-Arbi\'a\''], answer: 'Al-yawm Al-Ithnayn' },
    { id: 'a2-8', type: 'mcq', question: 'Translate: "Yesterday was Sunday"', options: ['Ams kana Al-Ahad', 'Ams kana As-Sabt', 'Ams kana Al-Jum\'ah'], answer: 'Ams kana Al-Ahad' },
    
    // Months & Dates
    { id: 'a2-9', type: 'mcq', question: 'Match the meaning: "Yanayir"', options: ["March", "January", "July", "December"], answer: 'January' },
    { id: 'a2-10', type: 'mcq', question: 'Match the meaning: "Disambar"', options: ["October", "January", "July", "December"], answer: 'December' },
    { id: 'a2-11', type: 'mcq', question: 'Fill in the blank: Al-yawm at-tareekh ______ (Today is the 5th)', options: ['khamsah', 'arba\'ah', 'sittah'], answer: 'khamsah' },
    { id: 'a2-12', type: 'mcq', question: 'Translate: "Today is 5th October"', options: ['Al-yawm khamsah Uktubar', 'Al-yawm arba\'ah Uktubar', 'Al-yawm sittah Uktubar'], answer: 'Al-yawm khamsah Uktubar' },
    
    // Daily Routine
    { id: 'a2-13', type: 'mcq', question: 'Match the meaning: "Astaiqith"', options: ["to sleep", "to wake up", "to eat", "to go to school"], answer: 'to wake up' },
    { id: 'a2-14', type: 'mcq', question: 'Match the meaning: "Anam"', options: ["to sleep", "to study", "to eat", "to wake up"], answer: 'to sleep' },
    { id: 'a2-15', type: 'mcq', question: 'Fill in the blank: ______ fi as-sabah (I wake up in the morning)', options: ['Astaiqith', 'Anam', 'Aqra'], answer: 'Astaiqith' },
    { id: 'a2-16', type: 'mcq', question: 'Rearrange into a valid sentence: al-madrasah / Adh-habu ila', options: ['Adh-habu ila al-madrasah', 'al-madrasah Adh-habu ila', 'Adh-habu al-madrasah ila'], answer: 'Adh-habu ila al-madrasah' },
    { id: 'a2-17', type: 'mcq', question: 'Translate: "I go to school"', options: ['Adh-habu ila al-madrasah', 'Adh-habu ila al-bayt', 'Adh-habu ila al-amal'], answer: 'Adh-habu ila al-madrasah' },
    
    // Module 3: Present Tense - Actions
    { id: 'a3-1', type: 'mcq', question: 'Match the meaning: "Akul"', options: ["I work", "I eat", "I read", "I sleep"], answer: 'I eat' },
    { id: 'a3-2', type: 'mcq', question: 'Fill in the blank: Ana ______ (I work)', options: ['A\'mal', 'Akul', 'Aqra'], answer: 'A\'mal' },
    { id: 'a3-3', type: 'mcq', question: 'Translate: "I read"', options: ['Aqra', 'Aktub', 'Astami\''], answer: 'Aqra' },
    { id: 'a3-4', type: 'listening', question: 'Which action matches "a-kul"?', options: ["I eat", "I read", "I sleep", "I wake up"], answer: 'I eat' },
    { id: 'a3-5', type: 'mcq', question: 'Match the meaning: "Aktub"', options: ["I write", "I read", "I eat", "I listen"], answer: 'I write' },
    { id: 'a3-6', type: 'mcq', question: 'Match the meaning: "Astami\'"', options: ["I listen", "I write", "I speak", "I sleep"], answer: 'I listen' },
    { id: 'a3-7', type: 'mcq', question: 'Fill in the blank: Ana ______ kitaban (I read a book)', options: ['Aqra', 'Aktub', 'Akul'], answer: 'Aqra' },
    { id: 'a3-8', type: 'mcq', question: 'Translate: "I write a letter"', options: ['Aktub risalah', 'Aqra risalah', 'Arsil risalah'], answer: 'Aktub risalah' },
    { id: 'a3-9', type: 'mcq', question: 'Rearrange into a valid phrase: al-ta\'aam / Akul', options: ['Akul al-ta\'aam', 'al-ta\'aam Akul', 'Akul Aqra'], answer: 'Akul al-ta\'aam' },
    { id: 'a3-10', type: 'mcq', question: 'Fill in the blank: Huwa ______ fi al-maktab (He works in the office)', options: ['Ya\'mal', 'Ya\'kul', 'Yaqra'], answer: 'Ya\'mal' },
    
    // Module 4: Asking Questions
    { id: 'a4-1', type: 'mcq', question: 'Match the meaning: "Ayna"', options: ["where", "who", "what", "how"], answer: 'where' },
    { id: 'a4-2', type: 'mcq', question: 'Match the meaning: "Man"', options: ["who", "what", "where", "why"], answer: 'who' },
    { id: 'a4-3', type: 'mcq', question: 'Fill in the blank: Ila ______ tadh-hab? (Where?)', options: ['Ayna', 'Man', 'Madha'], answer: 'Ayna' },
    { id: 'a4-4', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Ila ayna tadh-hab?', 'Madha taf\'al?', 'Min ayna ant?'], answer: 'Ila ayna tadh-hab?' },
    { id: 'a4-5', type: 'mcq', question: 'Match the meaning: "Madha"', options: ["what", "where", "who", "when"], answer: 'what' },
    { id: 'a4-6', type: 'mcq', question: 'Match the meaning: "Limadha"', options: ["why", "when", "how", "what"], answer: 'why' },
    { id: 'a4-7', type: 'mcq', question: 'Fill in the blank: ______ hatha? (What is this?)', options: ['Madha', 'Ayna', 'Man'], answer: 'Madha' },
    { id: 'a4-8', type: 'mcq', question: 'Translate: "Who is this?"', options: ['Man hatha?', 'Madha hatha?', 'Ayna hatha?'], answer: 'Man hatha?' },
    { id: 'a4-9', type: 'mcq', question: 'Rearrange into a valid question: taf\'al / Madha', options: ['Madha taf\'al?', 'taf\'al Madha?', 'Madha ayna?'], answer: 'Madha taf\'al?' },
    { id: 'a4-10', type: 'mcq', question: 'Fill in the blank: ______ ta\'akharta? (Why are you late?)', options: ['Limadha', 'Madha', 'Ayna'], answer: 'Limadha' },
    
    // Module 5: Conversations
    { id: 'a5-1', type: 'mcq', question: 'Match the meaning: "Uridu an ashtari"', options: ["I am selling", "I want to buy", "money", "market"], answer: 'I want to buy' },
    { id: 'a5-2', type: 'mcq', question: 'Dialogue Completion - A: Bikam? B: ______ (Translate: 500)', options: ['Khams mi\'ah', 'Arba\' mi\'ah', 'Sitt mi\'ah'], answer: 'Khams mi\'ah' },
    { id: 'a5-3', type: 'mcq', question: 'Translate: "I want to buy food"', options: ['Uridu an ashtari ta\'aman', 'Uridu an ashtari ma\'an', 'Uridu an ashtari fawakih'], answer: 'Uridu an ashtari ta\'aman' },
    { id: 'a5-4', type: 'mcq', question: 'Match the meaning: "As-suq"', options: ["the market", "the school", "the house", "the office"], answer: 'the market' },
    { id: 'a5-5', type: 'mcq', question: 'Fill in the blank: Uridu ______ min fadlik (I want water please)', options: ['ma\'an', 'ta\'aman', 'qahwah'], answer: 'ma\'an' },
    { id: 'a5-6', type: 'mcq', question: 'Translate: "The price is expensive"', options: ['As-si\'r ghalin', 'As-si\'r rakhis', 'As-si\'r jayyid'], answer: 'As-si\'r ghalin' },
    { id: 'a5-7', type: 'mcq', question: 'Dialogue: A: Min ayna ant? B: ______ (I am from Egypt)', options: ['Ana min Misr', 'Ana min Lubnan', 'Ana min Al-Iraq'], answer: 'Ana min Misr' },
    { id: 'a5-8', type: 'mcq', question: 'Rearrange: min fadlik / Uridu / ma\'an', options: ['Uridu ma\'an min fadlik', 'min fadlik Uridu ma\'an', 'ma\'an Uridu min fadlik'], answer: 'Uridu ma\'an min fadlik' },
    { id: 'a5-9', type: 'mcq', question: 'Match the meaning: "Hal yumkinuka musa\'adati?"', options: ["Can you help me?", "Where is the market?", "How much is this?"], answer: 'Can you help me?' },
    { id: 'a5-10', type: 'mcq', question: 'Translate: "I want to go to the restaurant"', options: ['Uridu an adh-haba ila al-mat\'am', 'Uridu an adh-haba ila al-bayt', 'Uridu an adh-haba ila as-suq'], answer: 'Uridu an adh-haba ila al-mat\'am' },
    
    // LEVEL 3-5: ADVANCED
    { id: 'a6-1', type: 'mcq', question: 'Phrase-Guided Translation: "I want to go home because I am tired"', options: ['Uridu an adh-haba ila al-bayt li-anni mut\'ab', 'Uridu an adh-haba ila al-madrasah li-anni mut\'ab', 'Uridu an adh-haba ila as-suq li-anni mut\'ab'], answer: 'Uridu an adh-haba ila al-bayt li-anni mut\'ab' },
    { id: 'a6-2', type: 'mcq', question: 'Conversation: "A: Where are you going? B: I am going to the market."', options: ['A: Ila ayna tadh-hab? B: Adh-habu ila as-suq', 'A: Madha taf\'al? B: Adh-habu ila as-suq', 'A: Min ayna ant? B: Adh-habu ila as-suq'], answer: 'A: Ila ayna tadh-hab? B: Adh-habu ila as-suq' },
    { id: 'a6-3', type: 'mcq', question: 'Fill-in Translation: ______ ghadan (I will go tomorrow)', options: ['Sa-adh-habu', 'Sa-akul', 'Sa-anam'], answer: 'Sa-adh-habu' },
    { id: 'a6-4', type: 'mcq', question: 'Error Correction: "Ana adh-hab suq ams" (I went to the market yesterday)', options: ['Dhahabtu ila as-suq ams', 'Ana dhahabtu as-suq ams', 'Adh-habu as-suq ams'], answer: 'Dhahabtu ila as-suq ams' },
    { id: 'a6-5', type: 'mcq', question: 'Scenario: "I studied at school. I have experience."', options: ['Darastu fi al-madrasah. Lidayya khibrah.', 'Adrusu fi al-madrasah. Lidayya khibrah.', 'Dhahabtu ila al-madrasah. Lidayya khibrah.'], answer: 'Darastu fi al-madrasah. Lidayya khibrah.' },
    { id: 'a6-6', type: 'mcq', question: 'Reverse Thinking: Create "I will eat"', options: ['Sa-akul', 'Akaltu', 'Akul'], answer: 'Sa-akul' },
    { id: 'a6-7', type: 'mcq', question: 'Long Story: "Yesterday I went to the market..."', options: ['Ams dhahabtu ila as-suq. Ishtaraytu ta\'aman wa ma\'an.', 'Ams dhahabtu ila as-suq. Ishtaraytu fawakih.', 'Ams dhahabtu ila as-suq. Ishtaraytu malabis.'], answer: 'Ams dhahabtu ila as-suq. Ishtaraytu ta\'aman wa ma\'an.' },
    { id: 'a6-8', type: 'mcq', question: 'Translate: "I studied Arabic for two years"', options: ['Darastu al-arabiyyah li-muddati sanatain', 'Adrusu al-arabiyyah li-muddati sanatain', 'Sa-adrusu al-arabiyyah'], answer: 'Darastu al-arabiyyah li-muddati sanatain' },
    { id: 'a6-9', type: 'mcq', question: 'Error Correction: "Ana dhahabu as-suq"', options: ['Dhahabtu ila as-suq', 'Ana dhahabu ila as-suq', 'Ana dhahabu as-suq'], answer: 'Dhahabtu ila as-suq' },
    { id: 'a6-10', type: 'mcq', question: 'Fill in: "Uhibbu ______ al-kutub" (I like reading books)', options: ['qira\'at', 'kitabat', 'sima\''], answer: 'qira\'at' },
    { id: 'a6-11', type: 'mcq', question: 'Conversation: "A: What do you do? B: I am a teacher"', options: ['A: Madha ta\'mal? B: Ana mu\'allim', 'A: Man anta? B: Ana mu\'allim', 'A: Ayna ta\'mal? B: Ana mu\'allim'], answer: 'A: Madha ta\'mal? B: Ana mu\'allim' },
    { id: 'a6-12', type: 'mcq', question: 'Translate: "The weather is beautiful today"', options: ['Al-taqs jameel al-yawm', 'Al-taqs bard al-yawm', 'Al-taqs harr al-yawm'], answer: 'Al-taqs jameel al-yawm' },

    // Level 2: Unit 7 - Professional Situations
    { id: 'a7-1', type: 'mcq', question: 'Match: "Maktab"', options: ['Office', 'Kitchen', 'Garage'], answer: 'Office' },
    { id: 'a7-2', type: 'mcq', question: 'Translate: "Ayna al-maktab?"', options: ['Where is the office?', 'What is your name?'], answer: 'Where is the office?' },
    { id: 'a7-3', type: 'mcq', question: 'Match: "Mudhir"', options: ['Manager', 'Teacher', 'Doctor'], answer: 'Manager' },
    { id: 'a7-4', type: 'mcq', question: 'Fill in: "Ana ______ fil-shirika" (I work in the company)', options: ['a\'mal', 'akul', 'anam'], answer: 'a\'mal' },
    { id: 'a7-5', type: 'mcq', question: 'Translate: "I have a meeting"', options: ['Ladiyya ijtima\'', 'Ana akul', 'Masaa al-khayr'], answer: 'Ladiyya ijtima\'' },
    
    // Level 2: Unit 8 - Planning
    { id: 'a8-1', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Ghadan', 'Ams', 'Al-yawm'], answer: 'Ghadan' },
    { id: 'a8-2', type: 'mcq', question: 'Translate: "Next week"', options: ['Al-usbu\' al-qadim', 'Al-shahr al-qadim'], answer: 'Al-usbu\' al-qadim' },
    { id: 'a8-3', type: 'mcq', question: 'Fill in: "Sa-aktub ______" (I will write a letter)', options: ['risala', 'qahwa', 'kitaab'], answer: 'risala' },
    { id: 'a8-4', type: 'mcq', question: 'Translate: "I will travel"', options: ['Sa-usafir', 'Dhahabtu', 'Ana huna'], answer: 'Sa-usafir' },
    { id: 'a8-5', type: 'mcq', question: 'Match: "Ijtima\' ghadan"', options: ['Meeting tomorrow', 'Meeting today'], answer: 'Meeting tomorrow' },

    // Level 2: Unit 9 - Telling Stories
    { id: 'a9-1', type: 'mcq', question: 'Translate: "Yesterday"', options: ['Ams', 'Ghadan', 'Al-yawm'], answer: 'Ams' },
    { id: 'a9-2', type: 'mcq', question: 'Fill in: "______ al-ta\'am" (I ate the food)', options: ['Akaltu', 'Akulu', 'Sa-akul'], answer: 'Akaltu' },
    { id: 'a9-3', type: 'mcq', question: 'Translate: "I went to the souq"', options: ['Dhahabtu ila al-souq', 'Ana fil-souq'], answer: 'Dhahabtu ila al-souq' },
    { id: 'a9-4', type: 'mcq', question: 'Match: "Kuntu huna"', options: ['I was here', 'I am here', 'I go here'], answer: 'I was here' },
    { id: 'a9-5', type: 'mcq', question: 'Translate: "He spoke with me"', options: ['Takallama ma\'i', 'Ana takallama'], answer: 'Takallama ma\'i' },

    // Level 2: Unit 10 - Logic & Opinion
    { id: 'a10-1', type: 'mcq', question: 'Translate: "Because"', options: ['Li-anna', 'Wa', 'Aw'], answer: 'Li-anna' },
    { id: 'a10-2', type: 'mcq', question: 'Translate: "In my opinion"', options: ['Fi ra\'yi', 'Ma\' as-salama'], answer: 'Fi ra\'yi' },
    { id: 'a10-3', type: 'mcq', question: 'Match: "Uhibbuha li-annaha jameela"', options: ['I love it because it is beautiful', 'I hate it'], answer: 'I love it because it is beautiful' },
    { id: 'a10-4', type: 'mcq', question: 'Translate: "I think that..."', options: ['A-zunnu anna...', 'Shukran'], answer: 'A-zunnu anna...' },
    { id: 'a10-5', type: 'mcq', question: 'Match: "Lakin"', options: ['But', 'And', 'Or'], answer: 'But' },

    // Level 2: Unit 11 - Travel & Logistics
    { id: 'a11-1', type: 'mcq', question: 'Match: "Tadhkira"', options: ['Ticket', 'Passport', 'Suitcase'], answer: 'Ticket' },
    { id: 'a11-2', type: 'mcq', question: 'Translate: "Reservation"', options: ['Hajz', 'Souq'], answer: 'Hajz' },
    { id: 'a11-3', type: 'mcq', question: 'Match: "Matar"', options: ['Airport', 'Train station'], answer: 'Airport' },
    { id: 'a11-4', type: 'mcq', question: 'Translate: "Where is my suitcase?"', options: ['Ayna haqibati?', 'Ayna bayti?'], answer: 'Ayna haqibati?' },
    { id: 'a11-5', type: 'mcq', question: 'Fill in: "Uridu ______ ila Dubai" (I want to go to Dubai)', options: ['al-dhahab', 'al-akl'], answer: 'al-dhahab' },

    // Level 2: Unit 12 - Expert Fluency
    { id: 'a12-1', type: 'mcq', question: 'Context: You are very busy.', options: ['Ana mashghul jiddan', 'Ana fil-bayt'], answer: 'Ana mashghul jiddan' },
    { id: 'a12-2', type: 'mcq', question: 'Translate: "Perfect"', options: ['Mumtaz', 'Jayyid', 'Asif'], answer: 'Mumtaz' },
    { id: 'a12-3', type: 'mcq', question: 'Match: "Insha\'Allah"', options: ['God willing', 'Thank God'], answer: 'God willing' },
    { id: 'a12-4', type: 'mcq', question: 'Match: "Alhamdulillah"', options: ['Praise be to God', 'Peace be with you'], answer: 'Praise be to God' },
    { id: 'a12-5', type: 'mcq', question: 'Translate: "Take care"', options: ['Intabih', 'Shukran'], answer: 'Intabih' },

    // Level 3: Unit 13 - Relationships
    { id: 'a13-1', type: 'mcq', question: 'Translate: "He is my best friend"', options: ['Huwa sadiqi al-mufaddal', 'Huwa akhi', 'Huwa mudiri'], answer: 'Huwa sadiqi al-mufaddal' },
    { id: 'a13-2', type: 'mcq', question: 'Match: "Ihtiram"', options: ['Respect', 'Love', 'Fear'], answer: 'Respect' },
    { id: 'a13-3', type: 'mcq', question: 'Translate: "We have a strong bond"', options: ['Ladayna rawabit qawiyya', 'Ladayna bayt', 'Ladayna sayyara'], answer: 'Ladayna rawabit qawiyya' },
    
    // Level 3: Unit 14 - Culture
    { id: 'a14-1', type: 'mcq', question: 'Match: "Turath"', options: ['Heritage', 'Future', 'War'], answer: 'Heritage' },
    { id: 'a14-2', type: 'mcq', question: 'Translate: "Hospitality is a virtue"', options: ['Al-karam fadila', 'Al-akl laiz', 'Al-shams jamila'], answer: 'Al-karam fadila' },
    
    // Level 3: Unit 15 - News & Issues
    { id: 'a15-1', type: 'mcq', question: 'Match: "Siyasa"', options: ['Politics', 'Science', 'Sports'], answer: 'Politics' },
    { id: 'a15-2', type: 'mcq', question: 'Translate: "The world is changing"', options: ['Al-alam yataghayyar', 'Al-alam kabir', 'Al-alam jamil'], answer: 'Al-alam yataghayyar' },
    
    // Level 3: Unit 16 - Environment
    { id: 'a16-1', type: 'mcq', question: 'Match: "Al-bi\'a"', options: ['The environment', 'The city', 'The space'], answer: 'The environment' },
    { id: 'a16-2', type: 'mcq', question: 'Translate: "Protecting nature is important"', options: ['Himayat al-tabi\'a muhimma', 'Al-tabi\'a jamil', 'Al-tabi\'a khadra'], answer: 'Himayat al-tabi\'a muhimma' },

    // Level 4: Unit 17 - Idioms & Mastery
    { id: 'a17-1', type: 'mcq', question: 'Translate: "Time is like a sword"', options: ['Al-waqt ka al-sayf', 'Al-waqt thamin', 'Al-waqt dahab'], answer: 'Al-waqt ka al-sayf' },
    { id: 'a17-2', type: 'mcq', question: 'Match: "Al-sabr miftah al-faraj"', options: ['Patience is the key to relief', 'Patience is hard', 'Luck is key'], answer: 'Patience is the key to relief' },
    
    // Level 4: Unit 18 - Business
    { id: 'a18-1', type: 'mcq', question: 'Match: "Istithmar"', options: ['Investment', 'Spending', 'Saving'], answer: 'Investment' },
    { id: 'a18-2', type: 'mcq', question: 'Translate: "We need a sustainable strategy"', options: ['Nahtaj ila istratijiyya mustadama', 'Nahtaj ila mal', 'Nahtaj ila waqt'], answer: 'Nahtaj ila istratijiyya mustadama' },
    
    // Level 4: Unit 19 - History & Art
    { id: 'a19-1', type: 'mcq', question: 'Match: "Hadara"', options: ['Civilization', 'Building', 'Forest'], answer: 'Civilization' },
    { id: 'a19-2', type: 'mcq', question: 'Translate: "Art reflects the soul"', options: ['Al-fann ya\'kis al-ruh', 'Al-fann jamil', 'Al-ruh qawiyya'], answer: 'Al-fann ya\'kis al-ruh' },
    
    // Level 4: Unit 20 - Philosophy
    { id: 'a20-1', type: 'mcq', question: 'Match: "Hikma"', options: ['Wisdom', 'Knowledge', 'Power'], answer: 'Wisdom' },
    { id: 'a20-2', type: 'mcq', question: 'Translate: "I think, therefore I am"', options: ['Ana ufakir, idan ana mawjud', 'Ana huna', 'Al-tafkir sa\'b'], answer: 'Ana ufakir, idan ana mawjud' },
  ],
  Kiswahili: [
    // Module 1: Greetings & Introductions
    { id: 'k1-1', type: 'mcq', question: 'Match the meaning: "Shikamoo"', options: ["what's up", "respectful greeting", "hello/news", "are you fine"], answer: 'respectful greeting' },
    { id: 'k1-2', type: 'mcq', question: 'Match the meaning: "Mambo"', options: ["what's up", "how are things", "respectful greeting", "hello/news"], answer: "what's up" },
    { id: 'k1-3', type: 'mcq', question: 'Fill in the blank: "______ gani?" (news?)', options: ['Habari', 'Hujambo', 'Mambo'], answer: 'Habari' },
    { id: 'k1-4', type: 'mcq', question: 'Fill in the blank to respond: "______? -> Sijambo" (are you fine?)', options: ['Hujambo', 'Habari', 'Shikamoo'], answer: 'Hujambo' },
    { id: 'k1-5', type: 'mcq', question: 'Fill in the blank (elder greeting): "______ sana"', options: ['Shikamoo', 'Asante', 'Jambo'], answer: 'Shikamoo' },
    { id: 'k1-6', type: 'mcq', question: 'Rearrange into a valid phrase: gani / Habari', options: ['Habari gani', 'Gani habari', 'Habari mambo'], answer: 'Habari gani' },
    { id: 'k1-7', type: 'mcq', question: 'Rearrange into a valid phrase: langu / jina / ni (my name is)', options: ['jina langu ni', 'ni langu jina', 'langu jina ni'], answer: 'jina langu ni' },
    { id: 'k1-8', type: 'mcq', question: 'Translate (Basic): "Hello"', options: ['Jambo', 'Asante', 'Habari'], answer: 'Jambo' },
    { id: 'k1-9', type: 'mcq', question: 'Translate (Basic): "How are you?"', options: ['Habari gani?', 'Hujambo?', 'Habari za asubuhi?'], answer: 'Habari gani?' },
    { id: 'k1-10', type: 'listening', question: 'Which greeting matches "ha-ba-ri"?', options: ['Shikamoo', 'Hujambo', 'Habari', 'Mambo'], answer: 'Habari' },
    
    // Module 2: Time, Days, Months, Routine
    { id: 'k2-1', type: 'mcq', question: 'Match the meaning: "Jumapili"', options: ["Sunday", "Wednesday", "Friday", "Monday"], answer: 'Sunday' },
    { id: 'k2-2', type: 'mcq', question: 'Match the meaning: "Jumatatu"', options: ["Tuesday", "Monday", "Sunday", "Friday"], answer: 'Monday' },
    { id: 'k2-3', type: 'mcq', question: 'Fill in the blank: Leo ni ______ (Today is Friday)', options: ['Ijumaa', 'Jumamosi', 'Jumapili'], answer: 'Ijumaa' },
    { id: 'k2-4', type: 'mcq', question: 'Fill in the blank: Kesho ni ______ (Tomorrow is Tuesday)', options: ['Jumanne', 'Jumatatu', 'Jumatano'], answer: 'Jumanne' },
    { id: 'k2-5', type: 'mcq', question: 'Fill in the blank: Jana ilikuwa ______ (Yesterday was Wednesday)', options: ['Jumatano', 'Jumanne', 'Alhamisi'], answer: 'Jumatano' },
    { id: 'k2-6', type: 'mcq', question: 'Rearrange into a valid sentence: leo / ni / Jumatatu', options: ['leo ni Jumatatu', 'Jumatatu ni leo', 'ni leo Jumatatu'], answer: 'leo ni Jumatatu' },
    { id: 'k2-7', type: 'mcq', question: 'Translate: "Today is Monday"', options: ['Leo ni Jumatatu', 'Leo ni Jumanne', 'Leo ni Jumatano'], answer: 'Leo ni Jumatatu' },
    { id: 'k2-8', type: 'mcq', question: 'Translate: "Yesterday was Sunday"', options: ['Jana ilikuwa Jumapili', 'Jana ilikuwa Jumamosi', 'Jana ilikuwa Ijumaa'], answer: 'Jana ilikuwa Jumapili' },
    
    // Months & Dates
    { id: 'k2-9', type: 'mcq', question: 'Match the meaning: "Januari"', options: ["March", "January", "July", "December"], answer: 'January' },
    { id: 'k2-10', type: 'mcq', question: 'Match the meaning: "Desemba"', options: ["October", "January", "July", "December"], answer: 'December' },
    { id: 'k2-11', type: 'mcq', question: 'Fill in the blank: Leo ni tarehe ______ (Today is the 5th)', options: ['tano', 'nne', 'sita'], answer: 'tano' },
    { id: 'k2-12', type: 'mcq', question: 'Translate: "Today is 5th October"', options: ['Leo ni tarehe tano Oktoba', 'Leo ni tarehe nne Oktoba', 'Leo ni tarehe sita Oktoba'], answer: 'Leo ni tarehe tano Oktoba' },
    
    // Daily Routine
    { id: 'k2-13', type: 'mcq', question: 'Match the meaning: "kuamka"', options: ["to sleep", "to wake up", "to eat", "to go to school"], answer: 'to wake up' },
    { id: 'k2-14', type: 'mcq', question: 'Match the meaning: "kulala"', options: ["to sleep", "to study", "to eat", "to wake up"], answer: 'to sleep' },
    { id: 'k2-15', type: 'mcq', question: 'Fill in the blank: Nina______ saa moja (I wake up at am)', options: ['amka', 'lala', 'soma'], answer: 'amka' },
    { id: 'k2-16', type: 'mcq', question: 'Rearrange into a valid sentence: shule / ninaenda', options: ['ninaenda shule', 'shule ninaenda', 'ninaenda nyumbani'], answer: 'ninaenda shule' },
    { id: 'k2-17', type: 'mcq', question: 'Translate: "I go to school"', options: ['Ninaenda shule', 'Ninaenda nyumbani', 'Ninaenda kazini'], answer: 'Ninaenda shule' },
    
    // Module 3: Present Tense - Actions
    { id: 'k3-1', type: 'mcq', question: 'Match the meaning: "Ninakula"', options: ["I work", "I eat", "I read", "I sleep"], answer: 'I eat' },
    { id: 'k3-2', type: 'mcq', question: 'Fill in the blank: Nina______ kazi (I work)', options: ['fanya', 'kula', 'soma'], answer: 'fanya' },
    { id: 'k3-3', type: 'mcq', question: 'Translate: "I read"', options: ['Ninasoma', 'Ninaandika', 'Ninasikiliza'], answer: 'Ninasoma' },
    { id: 'k3-4', type: 'listening', question: 'Which action matches "ni-na-ku-la"?', options: ["I eat", "I read", "I sleep", "I wake up"], answer: 'I eat' },
    { id: 'k3-5', type: 'mcq', question: 'Match the meaning: "Ninaandika"', options: ["I write", "I read", "I eat", "I listen"], answer: 'I write' },
    { id: 'k3-6', type: 'mcq', question: 'Match the meaning: "Ninasikiliza"', options: ["I listen", "I write", "I speak", "I sleep"], answer: 'I listen' },
    { id: 'k3-7', type: 'mcq', question: 'Fill in the blank: Nina______ kitabu (I read a book)', options: ['soma', 'andika', 'kula'], answer: 'soma' },
    { id: 'k3-8', type: 'mcq', question: 'Translate: "I write a letter"', options: ['Ninaandika barua', 'Ninasoma barua', 'Ninatuma barua'], answer: 'Ninaandika barua' },
    { id: 'k3-9', type: 'mcq', question: 'Rearrange into a valid phrase: chakula / Ninakula', options: ['Ninakula chakula', 'chakula Ninakula', 'Ninakula maji'], answer: 'Ninakula chakula' },
    { id: 'k3-10', type: 'mcq', question: 'Fill in the blank: Yeye ana______ ofisini (He works in the office)', options: ['fanya kazi', 'kula', 'soma'], answer: 'fanya kazi' },
    
    // Module 4: Asking Questions
    { id: 'k4-1', type: 'mcq', question: 'Match the meaning: "Wapi"', options: ["where", "who", "what", "how"], answer: 'where' },
    { id: 'k4-2', type: 'mcq', question: 'Match the meaning: "Nani"', options: ["who", "what", "where", "why"], answer: 'who' },
    { id: 'k4-3', type: 'mcq', question: 'Fill in the blank: ______ unakwenda? (Where?)', options: ['Wapi', 'Nani', 'Nini'], answer: 'Wapi' },
    { id: 'k4-4', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Unakwenda wapi?', 'Unafanya nini?', 'Unatoka wapi?'], answer: 'Unakwenda wapi?' },
    { id: 'k4-5', type: 'mcq', question: 'Match the meaning: "Nini"', options: ["what", "where", "who", "when"], answer: 'what' },
    { id: 'k4-6', type: 'mcq', question: 'Match the meaning: "Kwa nini"', options: ["why", "when", "how", "what"], answer: 'why' },
    { id: 'k4-7', type: 'mcq', question: 'Fill in the blank: Hii ni ______? (What is this?)', options: ['nini', 'wapi', 'nani'], answer: 'nini' },
    { id: 'k4-8', type: 'mcq', question: 'Translate: "Who is this?"', options: ['Huyu ni nani?', 'Hii ni nini?', 'Hapa ni wapi?'], answer: 'Huyu ni nani?' },
    { id: 'k4-9', type: 'mcq', question: 'Rearrange into a valid question: unafanya / nini', options: ['Unafanya nini?', 'nini unafanya?', 'Unafanya wapi?'], answer: 'Unafanya nini?' },
    { id: 'k4-10', type: 'mcq', question: 'Fill in the blank: ______ umechelewa? (Why are you late?)', options: ['Kwa nini', 'Nini', 'Wapi'], answer: 'Kwa nini' },
    
    // Module 5: Conversations
    { id: 'k5-1', type: 'mcq', question: 'Match the meaning: "Nataka kununua"', options: ["I am selling", "I want to buy", "money", "market"], answer: 'I want to buy' },
    { id: 'k5-2', type: 'mcq', question: 'Dialogue Completion - A: Bei gani? B: ______ (Translate: 500)', options: ['Mia tano', 'Mia nne', 'Mia sita'], answer: 'Mia tano' },
    { id: 'k5-3', type: 'mcq', question: 'Translate: "I want to buy food"', options: ['Nataka kununua chakula', 'Nataka kununua maji', 'Nataka kununua matunda'], answer: 'Nataka kununua chakula' },
    { id: 'k5-4', type: 'mcq', question: 'Match the meaning: "Soko"', options: ["the market", "the school", "the house", "the office"], answer: 'the market' },
    { id: 'k5-5', type: 'mcq', question: 'Fill in the blank: Nataka ______ tafadhali (I want water please)', options: ['maji', 'chakula', 'kahawa'], answer: 'maji' },
    { id: 'k5-6', type: 'mcq', question: 'Translate: "The price is expensive"', options: ['Bei ni ghali', 'Bei ni rahisi', 'Bei ni sawa'], answer: 'Bei ni ghali' },
    { id: 'k5-7', type: 'mcq', question: 'Dialogue: A: Unatoka wapi? B: ______ (I am from Tanzania)', options: ['Ninatoka Tanzania', 'Ninatoka Kenya', 'Ninatoka Uganda'], answer: 'Ninatoka Tanzania' },
    { id: 'k5-8', type: 'mcq', question: 'Rearrange: tafadhali / Nataka / maji', options: ['Nataka maji tafadhali', 'tafadhali Nataka maji', 'maji Nataka tafadhali'], answer: 'Nataka maji tafadhali' },
    { id: 'k5-9', type: 'mcq', question: 'Match the meaning: "Unaweza kunisaidia?"', options: ["Can you help me?", "Where is the market?", "How much is this?"], answer: 'Can you help me?' },
    { id: 'k5-10', type: 'mcq', question: 'Translate: "I want to go to the restaurant"', options: ['Nataka kwenda mkahawani', 'Nataka kwenda nyumbani', 'Nataka kwenda sokoni'], answer: 'Nataka kwenda mkahawani' },
    
    // LEVEL 3-5: ADVANCED
    { id: 'k6-1', type: 'mcq', question: 'Phrase-Guided Translation: "I want to go home because I am tired"', options: ['Nataka kwenda nyumbani kwa sababu nimechoka', 'Nataka kwenda shule kwa sababu nimechoka', 'Nataka kwenda sokoni kwa sababu nimechoka'], answer: 'Nataka kwenda nyumbani kwa sababu nimechoka' },
    { id: 'k6-2', type: 'mcq', question: 'Conversation: "A: Where are you going? B: I am going to the market."', options: ['A: Unakwenda wapi? B: Ninaenda sokoni', 'A: Unafanya nini? B: Ninaenda sokoni', 'A: Unatoka wapi? B: Ninaenda sokoni'], answer: 'A: Unakwenda wapi? B: Ninaenda sokoni' },
    { id: 'k6-3', type: 'mcq', question: 'Fill-in Translation: Nita______ kesho (I will go tomorrow)', options: ['enda', 'kula', 'lala'], answer: 'enda' },
    { id: 'k6-4', type: 'mcq', question: 'Error Correction: "Mimi kwenda soko jana"', options: ['Nilienda sokoni jana', 'Mimi nilienda soko jana', 'Ninaenda sokoni jana'], answer: 'Nilienda sokoni jana' },
    { id: 'k6-5', type: 'mcq', question: 'Scenario: "I studied at school. I have experience."', options: ['Nilisoma shuleni. Nina uzoefu.', 'Ninasoma shuleni. Nina uzoefu.', 'Nilienda shuleni. Nina uzoefu.'], answer: 'Nilisoma shuleni. Nina uzoefu.' },
    { id: 'k6-6', type: 'mcq', question: 'Reverse Thinking: Create "I will eat"', options: ['Nitakula', 'Nilikula', 'Ninakula'], answer: 'Nitakula' },
    { id: 'k6-7', type: 'mcq', question: 'Long Story: "Yesterday I went to the market..."', options: ['Jana nilienda sokoni. Nilinunua chakula na maji.', 'Jana nilienda sokoni. Nilinunua matunda.', 'Jana nilienda sokoni. Nilinunua nguo.'], answer: 'Jana nilienda sokoni. Nilinunua chakula na maji.' },
    { id: 'k6-8', type: 'mcq', question: 'Translate: "I studied Kiswahili for two years"', options: ['Nilisoma Kiswahili kwa miaka miwili', 'Ninasoma Kiswahili kwa miaka miwili', 'Nitasoma Kiswahili kwa miaka miwili'], answer: 'Nilisoma Kiswahili kwa miaka miwili' },
    { id: 'k6-9', type: 'mcq', question: 'Error Correction: "Mimi soma kitabu"', options: ['Ninasoma kitabu', 'Mimi soma kitabu', 'Mimi kusoma kitabu'], answer: 'Ninasoma kitabu' },
    { id: 'k6-10', type: 'mcq', question: 'Fill in: "Ninapenda ______ vitabu" (I like reading books)', options: ['kusoma', 'kuandika', 'kusikiliza'], answer: 'kusoma' },
    { id: 'k6-11', type: 'mcq', question: 'Conversation: "A: What do you do? B: I am a teacher"', options: ['A: Unafanya kazi gani? B: Mimi ni mwalimu', 'A: Wewe ni nani? B: Mimi ni mwalimu', 'A: Unakwenda wapi? B: Mimi ni mwalimu'], answer: 'A: Unafanya kazi gani? B: Mimi ni mwalimu' },
    { id: 'k6-12', type: 'mcq', question: 'Translate: "The weather is beautiful today"', options: ['Hali ya hewa ni nzuri leo', 'Hali ya hewa ni mbaya leo', 'Hali ya hewa ni baridi leo'], answer: 'Hali ya hewa ni nzuri leo' },

    // Level 2: Unit 7 - Workplace
    { id: 'k7-1', type: 'mcq', question: 'Match: "Ofisi"', options: ['Office', 'Kitchen', 'Garage'], answer: 'Office' },
    { id: 'k7-2', type: 'mcq', question: 'Translate: "Mimi ni mfanyakazi"', options: ['I am a worker', 'I am a student'], answer: 'I am a worker' },
    { id: 'k7-3', type: 'mcq', question: 'Match: "Moneja / Meneja"', options: ['Manager', 'Teacher', 'Doctor'], answer: 'Manager' },
    { id: 'k7-4', type: 'mcq', question: 'Fill in: "Nina______ ofisini" (I work in the office)', options: ['fanya kazi', 'kula', 'lala'], answer: 'fanya kazi' },
    { id: 'k7-5', type: 'mcq', question: 'Translate: "I have a meeting"', options: ['Nina mkutano', 'Nina chakula', 'Sikio'], answer: 'Nina mkutano' },

    // Level 2: Unit 8 - Planning
    { id: 'k8-1', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Kesho', 'Jana', 'Leo'], answer: 'Kesho' },
    { id: 'k8-2', type: 'mcq', question: 'Translate: "Next week"', options: ['Wiki ijayo', 'Mwezi ujao'], answer: 'Wiki ijayo' },
    { id: 'k8-3', type: 'mcq', question: 'Fill in: "Nitaandika ______" (I will write a letter)', options: ['barua', 'maji', 'chakula'], answer: 'barua' },
    { id: 'k8-4', type: 'mcq', question: 'Translate: "I will travel"', options: ['Nitasafiri', 'Nilisafiri', 'Ninasafiri'], answer: 'Nitasafiri' },
    { id: 'k8-5', type: 'mcq', question: 'Match: "Mkutano ni kesho"', options: ['Meeting is tomorrow', 'Meeting is today'], answer: 'Meeting is tomorrow' },

    // Level 2: Unit 9 - Telling Stories
    { id: 'k9-1', type: 'mcq', question: 'Translate: "Yesterday"', options: ['Jana', 'Kesho', 'Leo'], answer: 'Jana' },
    { id: 'k9-2', type: 'mcq', question: 'Fill in: "______ chakula" (I ate food)', options: ['Nilikula', 'Ninakula', 'Nitakula'], answer: 'Nilikula' },
    { id: 'k9-3', type: 'mcq', question: 'Translate: "I went to the store"', options: ['Nilienda dukani', 'Niko dukani'], answer: 'Nilienda dukani' },
    { id: 'k9-4', type: 'mcq', question: 'Match: "Niliwaona"', options: ['I saw them', 'I saw you', 'They saw me'], answer: 'I saw them' },
    { id: 'k9-5', type: 'mcq', question: 'Translate: "He spoke with me"', options: ['Alisema na mimi', 'Niseme na wewe'], answer: 'Alisema na mimi' },

    // Level 2: Unit 10 - Logic & Opinion
    { id: 'k10-1', type: 'mcq', question: 'Translate: "Because"', options: ['Kwa sababu', 'Na', 'Au'], answer: 'Kwa sababu' },
    { id: 'k10-2', type: 'mcq', question: 'Translate: "In my opinion"', options: ['Kwa maoni yangu', 'Asante sana'], answer: 'Kwa maoni yangu' },
    { id: 'k10-3', type: 'mcq', question: 'Match: "Naipenda kwa sababu ni nzuri"', options: ['I love it because it is good', 'I hate it'], answer: 'I love it because it is good' },
    { id: 'k10-4', type: 'mcq', question: 'Translate: "I think that..."', options: ['Nafikiri kwamba...', 'Sijui'], answer: 'Nafikiri kwamba...' },
    { id: 'k10-5', type: 'mcq', question: 'Match: "Lakini"', options: ['But', 'And', 'Or'], answer: 'But' },

    // Level 2: Unit 11 - Travel & Logistics
    { id: 'k11-1', type: 'mcq', question: 'Match: "Tiketi"', options: ['Ticket', 'Passport', 'Bag'], answer: 'Ticket' },
    { id: 'k11-2', type: 'mcq', question: 'Translate: "Reservation"', options: ['Hifadhi', 'Duka'], answer: 'Hifadhi' },
    { id: 'k11-3', type: 'mcq', question: 'Match: "Uwanja wa ndege"', options: ['Airport', 'Bus station'], answer: 'Airport' },
    { id: 'k11-4', type: 'mcq', question: 'Translate: "Where is my bag?"', options: ['Mfuko wangu uko wapi?', 'Nyumba iko wapi?'], answer: 'Mfuko wangu uko wapi?' },
    { id: 'k11-5', type: 'mcq', question: 'Fill in: "Nataka ______ nyumbani" (I want to go home)', options: ['kwenda', 'kula'], answer: 'kwenda' },

    // Level 2: Unit 12 - Expert Fluency
    { id: 'k12-1', type: 'mcq', question: 'Translate: "Sawa kabisa"', options: ['Perfectly fine', 'Very bad', 'Maybe'], answer: 'Perfectly fine' },
    { id: 'k12-2', type: 'mcq', question: 'Match: "Haraka haraka haina baraka"', options: ['Hurry hurry has no blessing', 'Time is money'], answer: 'Hurry hurry has no blessing' },
    { id: 'k12-3', type: 'mcq', question: 'Match: "Hamna shida"', options: ['No problem', 'Thank you'], answer: 'No problem' },
    { id: 'k12-4', type: 'mcq', question: 'Translate: "I understand"', options: ['Naelewa', 'Sielewi'], answer: 'Naelewa' },
    { id: 'k12-5', type: 'mcq', question: 'Translate: "Excellent"', options: ['Bora kabisa', 'Mbaya sana'], answer: 'Bora kabisa' },

    // Level 3: Unit 13 - Social Life
    { id: 'k13-1', type: 'mcq', question: 'Translate: "He is my best friend"', options: ['Yeye ni rafiki yangu wa dhati', 'Yeye ni ndugu yangu', 'Yeye ni mwalimu wangu'], answer: 'Yeye ni rafiki yangu wa dhati' },
    { id: 'k13-2', type: 'mcq', question: 'Match: "Urafiki"', options: ['Friendship', 'Love', 'Family'], answer: 'Friendship' },
    { id: 'k13-3', type: 'mcq', question: 'Translate: "Let us celebrate together"', options: ['Tusherehekee pamoja', 'Tucheze pamoja', 'Tulie pamoja'], answer: 'Tusherehekee pamoja' },

    // Level 3: Unit 14 - Culture
    { id: 'k14-1', type: 'mcq', question: 'Match: "Utamaduni"', options: ['Culture', 'History', 'Language'], answer: 'Culture' },
    { id: 'k14-2', type: 'mcq', question: 'Translate: "Unity is strength"', options: ['Umoja ni nguvu', 'Maji ni uhai', 'Elimu ni mwanga'], answer: 'Umoja ni nguvu' },

    // Level 3: Unit 15 - News & Issues
    { id: 'k15-1', type: 'mcq', question: 'Match: "Siasa"', options: ['Politics', 'Economy', 'Education'], answer: 'Politics' },
    { id: 'k15-2', type: 'mcq', question: 'Translate: "The constitution is important"', options: ['Katiba ni muhimu', 'Sheria ni kali', 'Nchi ni yetu'], answer: 'Katiba ni muhimu' },

    // Level 3: Unit 16 - Environment
    { id: 'k16-1', type: 'mcq', question: 'Match: "Mazingira"', options: ['Environment', 'Forest', 'Ocean'], answer: 'Environment' },
    { id: 'k16-2', type: 'mcq', question: 'Translate: "Climate change is real"', options: ['Mabadiliko ya tabianchi ni kweli', 'Mvua inanyesha', 'Jua ni kali'], answer: 'Mabadiliko ya tabianchi ni kweli' },

    // Level 4: Unit 17 - Idioms & Mastery
    { id: 'k17-1', type: 'mcq', question: 'Match: "Baada ya dhiki, faraja"', options: ['After hardship comes relief', 'Hurry has no blessings', 'Knowledge is power'], answer: 'After hardship comes relief' },
    { id: 'k17-2', type: 'mcq', question: 'Translate: "Hasty climbers have sudden falls"', options: ['Aliyekimbia haachi harufu', 'Pole pole ndio mwendo', 'Haraka haraka haina baraka'], answer: 'Haraka haraka haina baraka' },

    // Level 4: Unit 18 - Business
    { id: 'k18-1', type: 'mcq', question: 'Match: "Uchumi"', options: ['Economy', 'Trade', 'Debt'], answer: 'Economy' },
    { id: 'k18-2', type: 'mcq', question: 'Translate: "We need more investment"', options: ['Tunahitaji uwekezaji zaidi', 'Tunahitaji fedha zaidi', 'Tunahitaji kazi zaidi'], answer: 'Tunahitaji uwekezaji zaidi' },

    // Level 4: Unit 19 - History & Art
    { id: 'k19-1', type: 'mcq', question: 'Match: "Historia"', options: ['History', 'Future', 'Today'], answer: 'History' },
    { id: 'k19-2', type: 'mcq', question: 'Translate: "The museum is full of artifacts"', options: ['Makumbusho yamejaa vitu vya kale', 'Maktaba imejaa vitabu', 'Shule imejaa watoto'], answer: 'Makumbusho yamejaa vitu vya kale' },

    // Level 4: Unit 20 - Philosophy
    { id: 'k20-1', type: 'mcq', question: 'Match: "Falsafa"', options: ['Philosophy', 'Religion', 'Dream'], answer: 'Philosophy' },
    { id: 'k20-2', type: 'mcq', question: 'Translate: "Knowledge has no end"', options: ['Elimu haina mwisho', 'Maisha ni mafupi', 'Kifo hakina huruma'], answer: 'Elimu haina mwisho' },
  ],
  Runyankore: [
    // Unit 1: Greetings
    { id: 'r1-1', type: 'mcq', question: 'Select the translation for: "Hello"', options: ['Agandi', 'Mwebare', 'Kare', 'Eego'], answer: 'Agandi' },
    { id: 'r1-2', type: 'listening', question: 'What do you hear?', options: ['Oraire ota?', 'Osiibire ota?', 'Webare munonga', 'Agandi ge?'], answer: 'Oraire ota?' },
    { id: 'r1-3', type: 'mcq', question: 'Translate: "Thank you very much"', options: ['Webare munonga', 'Agandi', 'Tinkumanya'], answer: 'Webare munonga' },
    { id: 'r1-4', type: 'mcq', question: 'Response to "Agandi":', options: ['Nungi', 'Mwebare', 'Kare'], answer: 'Nungi' },
    { id: 'r1-5', type: 'mcq', question: 'Translate: "Good night"', options: ['Oraire gye', 'Osiibire gye', 'Agandi'], answer: 'Oraire gye' },
    { id: 'r1-6', type: 'mcq', question: 'Match the meaning: "Osiibire ota?"', options: ["How was your afternoon?", "Good morning", "Thank you", "Goodbye"], answer: 'How was your afternoon?' },
    { id: 'r1-7', type: 'mcq', question: 'Fill in the blank: Oraire ota? -> Oraire ______ (I slept well)', options: ['gye', 'nungi', 'ota'], answer: 'gye' },
    { id: 'r1-8', type: 'mcq', question: 'Translate: "Excuse me / Sorry"', options: ['Ihangane', 'Agandi', 'Webare'], answer: 'Ihangane' },
    { id: 'r1-9', type: 'mcq', question: 'Match the meaning: "Turatsiindika"', options: ["Goodbye (we escort you)", "Hello", "Thank you", "How are you?"], answer: 'Goodbye (we escort you)' },
    { id: 'r1-10', type: 'listening', question: 'What greeting do you hear: "a-gan-di"?', options: ['Agandi', 'Webare', 'Oraire', 'Osiibire'], answer: 'Agandi' },

    // Unit 2: Time and Days
    { id: 'r2-1', type: 'mcq', question: 'Match the meaning: "Eizoba"', options: ['The Sun / Day', 'The Moon', 'The Stars'], answer: 'The Sun / Day' },
    { id: 'r2-2', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Nyencakare', 'Nyomwabazyo', 'Eizooba'], answer: 'Nyencakare' },
    { id: 'r2-3', type: 'mcq', question: 'Translate: "Today"', options: ['Erizooba', 'Nyencakare', 'Kare'], answer: 'Erizooba' },
    { id: 'r2-4', type: 'mcq', question: 'Match: "Ekiro"', options: ['Night', 'Morning', 'Afternoon'], answer: 'Night' },
    { id: 'r2-5', type: 'mcq', question: 'Translate: "Yesterday"', options: ['Nyomwabazyo', 'Nyencakare', 'Erizooba'], answer: 'Nyomwabazyo' },
    { id: 'r2-6', type: 'mcq', question: 'Match the meaning: "Bwakare"', options: ["In the morning", "At night", "In the afternoon"], answer: 'In the morning' },
    { id: 'r2-7', type: 'mcq', question: 'Fill in the blank: ______ ni Orwakabiri (Today is Tuesday)', options: ['Erizooba', 'Nyencakare', 'Ekiro'], answer: 'Erizooba' },
    { id: 'r2-8', type: 'mcq', question: 'Translate: "What time is it?"', options: ['Ni shaaha zingahi?', 'Ni eizooba ki?', 'Nooza nkahi?'], answer: 'Ni shaaha zingahi?' },
    { id: 'r2-9', type: 'mcq', question: 'Match: "Orwokushatu"', options: ['Wednesday', 'Monday', 'Friday'], answer: 'Wednesday' },
    { id: 'r2-10', type: 'mcq', question: 'Translate: "In the evening"', options: ['Bwagooroba', 'Bwakare', 'Ekiro'], answer: 'Bwagooroba' },

    // Unit 3: Actions
    { id: 'r3-1', type: 'mcq', question: 'Translate: "To eat"', options: ['Okulya', 'Okunywa', 'Okukora'], answer: 'Okulya' },
    { id: 'r3-2', type: 'mcq', question: 'Translate: "To drink"', options: ['Okunywa', 'Okulya', 'Okuryama'], answer: 'Okunywa' },
    { id: 'r3-3', type: 'mcq', question: 'Match: "Okukora"', options: ['To work', 'To play', 'To sing'], answer: 'To work' },
    { id: 'r3-4', type: 'mcq', question: 'Translate: "To sleep"', options: ['Okuryama', 'Okuzina', 'Okusoma'], answer: 'Okuryama' },
    { id: 'r3-5', type: 'mcq', question: 'Match: "Okusoma"', options: ['To read/study', 'To cook', 'To run'], answer: 'To read/study' },
    { id: 'r3-6', type: 'mcq', question: 'Translate: "To cook"', options: ['Okufumbira', 'Okulya', 'Okunywa'], answer: 'Okufumbira' },
    { id: 'r3-7', type: 'mcq', question: 'Fill in the blank: Ni______ ebyokurya (I am eating food)', options: ['nkurya', 'nkukora', 'nkusoma'], answer: 'nkurya' },
    { id: 'r3-8', type: 'mcq', question: 'Translate: "To walk"', options: ['Okutambura', 'Okuryama', 'Okuzina'], answer: 'Okutambura' },
    { id: 'r3-9', type: 'mcq', question: 'Match: "Okuzina"', options: ['To dance', 'To sleep', 'To eat'], answer: 'To dance' },
    { id: 'r3-10', type: 'mcq', question: 'Translate: "I am working"', options: ['Ninkukora', 'Ninkurya', 'Ninkusoma'], answer: 'Ninkukora' },

    // Unit 4: Questions
    { id: 'r4-1', type: 'mcq', question: 'Translate: "Where?"', options: ['Nkahi?', 'Ryari?', 'Nani?'], answer: 'Nkahi?' },
    { id: 'r4-2', type: 'mcq', question: 'Translate: "When?"', options: ['Ryari?', 'Ahabwaki?', 'Niki?'], answer: 'Ryari?' },
    { id: 'r4-3', type: 'mcq', question: 'Translate: "Who?"', options: ['Nani?', 'Niki?', 'Nkahi?'], answer: 'Nani?' },
    { id: 'r4-4', type: 'mcq', question: 'Translate: "What?"', options: ['Niki?', 'Ahabwaki?', 'Ryari?'], answer: 'Niki?' },
    { id: 'r4-5', type: 'mcq', question: 'Translate: "Why?"', options: ['Ahabwaki?', 'Niki?', 'Nkahi?'], answer: 'Ahabwaki?' },
    { id: 'r4-6', type: 'mcq', question: 'Fill in the blank: ______ nooza? (Where are you going?)', options: ['Nkahi', 'Ryari', 'Nani'], answer: 'Nkahi' },
    { id: 'r4-7', type: 'mcq', question: 'Translate: "How many?"', options: ['Zingahi?', 'Nkahi?', 'Niki?'], answer: 'Zingahi?' },
    { id: 'r4-8', type: 'mcq', question: 'Rearrange: nooza / Nkahi', options: ['Nkahi nooza?', 'nooza Nkahi?', 'Nkahi niki?'], answer: 'Nkahi nooza?' },
    { id: 'r4-9', type: 'mcq', question: 'Translate: "What is your name?"', options: ['Eizina ryawe ni rya nani?', 'Nooza nkahi?', 'Orikukora niki?'], answer: 'Eizina ryawe ni rya nani?' },
    { id: 'r4-10', type: 'mcq', question: 'Match: "Orikukora niki?"', options: ['What are you doing?', 'Where are you?', 'Who are you?'], answer: 'What are you doing?' },

    // Unit 5: Market Chat
    { id: 'r5-1', type: 'mcq', question: 'Translate: "Money"', options: ['Esaente', 'Eshaho', 'Emotoka'], answer: 'Esaente' },
    { id: 'r5-2', type: 'mcq', question: 'Match: "Okugura"', options: ['To buy', 'To sell', 'To trade'], answer: 'To buy' },
    { id: 'r5-3', type: 'mcq', question: 'Translate: "How much?"', options: ['Zingahi?', 'Nkahi?', 'Niki?'], answer: 'Zingahi?' },
    { id: 'r5-4', type: 'mcq', question: 'Match: "Omushubuzi"', options: ['Trader/Seller', 'Buyer', 'Police'], answer: 'Trader/Seller' },
    { id: 'r5-5', type: 'mcq', question: 'Translate: "I want..."', options: ['Ninyenda...', 'Ninkunda...', 'Nyine...'], answer: 'Ninyenda...' },
    { id: 'r5-6', type: 'mcq', question: 'Match the meaning: "Okuguza"', options: ["To sell", "To buy", "To give"], answer: 'To sell' },
    { id: 'r5-7', type: 'mcq', question: 'Fill in the blank: Ninyenda ______ ematooke (I want to buy matooke)', options: ['okugura', 'okuguza', 'okulya'], answer: 'okugura' },
    { id: 'r5-8', type: 'mcq', question: 'Translate: "This is too expensive"', options: ['Eki ni kyenshi munonga', 'Eki ni kyangu', 'Eki ni kirungi'], answer: 'Eki ni kyenshi munonga' },
    { id: 'r5-9', type: 'mcq', question: 'Dialogue: A: Zingahi? B: ______ (Five thousand)', options: ['Eshirini za bitano', 'Obukumi butano', 'Enkumi ittaano'], answer: 'Enkumi ittaano' },
    { id: 'r5-10', type: 'mcq', question: 'Translate: "Give me change"', options: ['Ompe echenji', 'Ompe esaente', 'Ompe ebyokurya'], answer: 'Ompe echenji' },

    // Unit 6: Advanced
    { id: 'r6-1', type: 'mcq', question: 'Translate: "I am going to the market"', options: ['Nindaza omu katale', 'Nindya amatooke', 'Naaba ndi aha'], answer: 'Nindaza omu katale' },
    { id: 'r6-2', type: 'mcq', question: 'Translate: "I like learning Runyankore"', options: ['Ninkunda kwega Orunyankore', 'Ninsoma ebitabo', 'Nyine esaente'], answer: 'Ninkunda kwega Orunyankore' },
    { id: 'r6-3', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Nooza nkahi?', 'Oryari?', 'Oguzire niki?'], answer: 'Nooza nkahi?' },
    { id: 'r6-4', type: 'mcq', question: 'Translate: "Thank you for the food"', options: ['Webare ebyokurya', 'Webare omurimo', 'Agandi gye'], answer: 'Webare ebyokurya' },
    { id: 'r6-5', type: 'mcq', question: 'Translate: "It is a good day"', options: ['Nizeiro nungi', 'Eizoba rirungi', 'Kare munonga'], answer: 'Eizoba rirungi' },
    { id: 'r6-6', type: 'mcq', question: 'Translate: "I went to school yesterday"', options: ['Nagize omu ishomero nyomwabazyo', 'Nindaza omu ishomero erizooba', 'Ninyenda okugira omu ishomero'], answer: 'Nagize omu ishomero nyomwabazyo' },
    { id: 'r6-7', type: 'mcq', question: 'Error Correction: "Mwe nkugura katale" (I bought at the market)', options: ['Naguzire omu katale', 'Mwe nkugura katale', 'Nindagura omu katale'], answer: 'Naguzire omu katale' },
    { id: 'r6-8', type: 'mcq', question: 'Conversation: "A: Where do you live? B: I live in Mbarara"', options: ['A: Otuura nkahi? B: Nintuura Mbarara', 'A: Nooza nkahi? B: Nintuura Mbarara', 'A: Ori nkahi? B: Ndi Mbarara'], answer: 'A: Otuura nkahi? B: Nintuura Mbarara' },
    { id: 'r6-9', type: 'mcq', question: 'Fill in: "Ninkunda ______ Orunyankore" (I like speaking Runyankore)', options: ['kwetegyereza', 'kushoma', 'kwogera'], answer: 'kwogera' },
    { id: 'r6-10', type: 'mcq', question: 'Translate: "I will come back tomorrow"', options: ['Ningaruka nyencakare', 'Nagize nyomwabazyo', 'Nindaza erizooba'], answer: 'Ningaruka nyencakare' },

    // Level 2: Unit 7 - Workplace
    { id: 'r7-1', type: 'mcq', question: 'Match: "Ofiisi"', options: ['Office', 'Market', 'House'], answer: 'Office' },
    { id: 'r7-2', type: 'mcq', question: 'Translate: "Ndi omukozi"', options: ['I am a worker', 'I am a student'], answer: 'I am a worker' },
    { id: 'r7-3', type: 'mcq', question: 'Match: "Omwebembezi"', options: ['Leader/Manager', 'Teacher', 'Child'], answer: 'Leader/Manager' },
    { id: 'r7-4', type: 'mcq', question: 'Fill in: "Ninkukora ______" (I am working in the office)', options: ['omu ofiisi', 'omu nju'], answer: 'omu ofiisi' },
    { id: 'r7-5', type: 'mcq', question: 'Match: "Omurimo"', options: ['Work/Job', 'Food', 'Play'], answer: 'Work/Job' },

    // Level 2: Unit 8 - Planning
    { id: 'r8-1', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Nyencakare', 'Nyomwabazyo'], answer: 'Nyencakare' },
    { id: 'r8-2', type: 'mcq', question: 'Translate: "Sande erikutaho"', options: ['Next week', 'Kare'], answer: 'Sande erikutaho' },
    { id: 'r8-3', type: 'mcq', question: 'Fill in: "Ndyaza ______" (I will go tomorrow)', options: ['nyencakare', 'erizooba'], answer: 'nyencakare' },
    { id: 'r8-4', type: 'mcq', question: 'Translate: "I will visit you"', options: ['Ndyaya kukutaayaayira', 'Ndi omuka'], answer: 'Ndyaya kukutaayaayira' },
    { id: 'r8-5', type: 'mcq', question: 'Match: "Shaaha ishatu"', options: ['9 o\'clock', '3 o\'clock'], answer: '9 o\'clock' },

    // Level 2: Unit 9 - Telling Stories
    { id: 'r9-1', type: 'mcq', question: 'Translate: "Nyomwabazyo"', options: ['Yesterday', 'Tomorrow'], answer: 'Nyomwabazyo' },
    { id: 'r9-2', type: 'mcq', question: 'Fill in: "______ ebyokurya" (I ate food)', options: ['Naryire', 'Nindya'], answer: 'Naryire' },
    { id: 'r9-3', type: 'mcq', question: 'Translate: "I went home"', options: ['Nakaba ngyenda omuka', 'Ndi omuka'], answer: 'Nakaba ngyenda omuka' },
    { id: 'r9-4', type: 'mcq', question: 'Match: "Akagira"', options: ['He/She said', 'I said'], answer: 'He/She said' },
    { id: 'r9-5', type: 'mcq', question: 'Translate: "I saw them"', options: ['Naabareeba', 'Baandeba'], answer: 'Naabareeba' },

    // Level 2: Unit 10 - Logic & Opinion
    { id: 'r10-1', type: 'mcq', question: 'Match: "Ahakuba"', options: ['Because', 'And', 'But'], answer: 'Because' },
    { id: 'r10-2', type: 'mcq', question: 'Translate: "In my view"', options: ['Okukwata oku ninteekateeka', 'Mwebare'], answer: 'Okukwata oku ninteekateeka' },
    { id: 'r10-3', type: 'mcq', question: 'Match: "Nimukunda ahakuba ni murungi"', options: ['I love him because he is good', 'I hate him'], answer: 'I love him because he is good' },
    { id: 'r10-4', type: 'mcq', question: 'Translate: "I think that"', options: ['Ninteekateeka ngu', 'Sinyakumanya'], answer: 'Ninteekateeka ngu' },
    { id: 'r10-5', type: 'mcq', question: 'Match: "Kwonka"', options: ['But', 'And', 'Or'], answer: 'But' },

    // Level 2: Unit 11 - Travel & Logistics
    { id: 'r11-1', type: 'mcq', question: 'Match: "Tikiti"', options: ['Ticket', 'Money'], answer: 'Tikiti' },
    { id: 'r11-2', type: 'mcq', question: 'Translate: "Emigigo"', options: ['Luggage/Bag', 'Car'], answer: 'Luggage/Bag' },
    { id: 'r11-3', type: 'mcq', question: 'Match: "Paaka y\'emootoka"', options: ['Bus station', 'Airport'], answer: 'Bus station' },
    { id: 'r11-4', type: 'mcq', question: 'Translate: "Where is my bag?"', options: ['Emigigo yangye eri he?', 'Enju yangye eri he?'], answer: 'Emigigo yangye eri he?' },
    { id: 'r11-5', type: 'mcq', question: 'Fill in: "Ninyenda ______ omuka" (I want to go home)', options: ['okuza', 'okulya'], answer: 'okuza' },

    // Level 2: Unit 12 - Expert Fluency
    { id: 'r12-1', type: 'mcq', question: 'Translate: "Kirungi munonga"', options: ['Very good', 'Very bad'], answer: 'Very good' },
    { id: 'r12-2', type: 'mcq', question: 'Match: "Kare"', options: ['Okay / Well then', 'Hello'], answer: 'Okay / Well then' },
    { id: 'r12-3', type: 'mcq', question: 'Match: "Tuhwerane"', options: ['Let us help each other', 'Let us play'], answer: 'Let us help each other' },
    { id: 'r12-4', type: 'mcq', question: 'Translate: "I understand"', options: ['Nyetegyereza', 'Nimanya'], answer: 'Nyetegyereza' },
    { id: 'r12-5', type: 'mcq', question: 'Translate: "Perfect"', options: ['Kihikire kakuku', 'Kirungi'], answer: 'Kihikire kakuku' },

    // Level 3: Unit 13 - Social Relationships
    { id: 'r13-1', type: 'mcq', question: 'Translate: "They are loving each other"', options: ['Nibakundana', 'Nibakora', 'Nibasoma'], answer: 'Nibakundana' },
    { id: 'r13-2', type: 'mcq', question: 'Match: "Obukundane"', options: ['Love/Affection', 'Hatred', 'Anger'], answer: 'Love/Affection' },
    { id: 'r13-3', type: 'mcq', question: 'Translate: "We are good neighbors"', options: ['Turi abataahi barungi', 'Turi abanywani', 'Turi abantu'], answer: 'Turi abataahi barungi' },

    // Level 3: Unit 14 - Culture
    { id: 'r14-1', type: 'mcq', question: 'Match: "Ebyobuhangwa"', options: ['Culture/Heritage', 'Science', 'Politics'], answer: 'Culture/Heritage' },
    { id: 'r14-2', type: 'mcq', question: 'Translate: "Respecting elders is key"', options: ['Okuha abakuru ekitinisa ni kikuru', 'Okulya ni kirungi', 'Okukora ni kirungi'], answer: 'Okuha abakuru ekitinisa ni kikuru' },

    // Level 3: Unit 15 - News & Communication
    { id: 'r15-1', type: 'mcq', question: 'Match: "Amakuru g\'erizooba"', options: ['Today\'s news', 'Tomorrow\'s plan', 'Yesterday\'s story'], answer: 'Today\'s news' },
    { id: 'r15-2', type: 'mcq', question: 'Translate: "The radio is loud"', options: ['Radiyo erikuranga munonga', 'Radiyo ni mbi', 'Radiyo ni nungi'], answer: 'Radiyo erikuranga munonga' },

    // Level 3: Unit 16 - Nature
    { id: 'r16-1', type: 'mcq', question: 'Match: "Ebibira"', options: ['Forests', 'Rivers', 'Mountains'], answer: 'Forests' },
    { id: 'r16-2', type: 'mcq', question: 'Translate: "Protect the environment"', options: ['Linda obuhangwa', 'Rya ebyokurya', 'Kora omurimo'], answer: 'Linda obuhangwa' },

    // Level 4: Unit 17 - Mastery & Idioms
    { id: 'r17-1', type: 'mcq', question: 'Match: "Akari omu nju nikwo kamanywa nyinemu"', options: ['What is in the house is known by the owner', 'A loud voice is strong', 'Patience is good'], answer: 'What is in the house is known by the owner' },
    { id: 'r17-2', type: 'mcq', question: 'Translate: "Wisdom is better than strength"', options: ['Obwengye nibukira amaani', 'Amaani ni marungi', 'Okukora ni kirungi'], answer: 'Obwengye nibukira amaani' },

    // Level 4: Unit 18 - Professionalism
    { id: 'r18-1', type: 'mcq', question: 'Match: "Obushubuzi"', options: ['Trade/Business', 'Farming', 'Fishing'], answer: 'Trade/Business' },
    { id: 'r18-2', type: 'mcq', question: 'Translate: "We need a leadership meeting"', options: ['Nahtaj ila mkutano wa viongozi', 'Nahtaj ila chakula', 'Nahtaj ila pesa'], answer: 'Nahtaj ila mkutano wa viongozi' },

    // Level 4: Unit 19 - History
    { id: 'r19-1', type: 'mcq', question: 'Match: "Ebyaaira"', options: ['History/Ancient things', 'Future', 'News'], answer: 'History/Ancient things' },
    { id: 'r19-2', type: 'mcq', question: 'Translate: "Honoring our ancestors"', options: ['Okuha bakaishikiitwe ekitinisa', 'Okulya hamwe', 'Okuzina'], answer: 'Okuha bakaishikiitwe ekitinisa' },

    // Level 4: Unit 20 - Philosophical Thought
    { id: 'r20-1', type: 'mcq', question: 'Match: "Okuteekateeka kw\'omwoyo"', options: ['Spiritual/Deep thought', 'Physical exercise', 'Eating'], answer: 'Spiritual/Deep thought' },
    { id: 'r20-2', type: 'mcq', question: 'Translate: "Life has many paths"', options: ['Amagara gaine emihanda mingi', 'Amagara ni mabi', 'Amagara ni marungi'], answer: 'Amagara gaine emihanda mingi' },
  ],
  Luganda: [
    // Unit 1: Greetings
    { id: 'l1-1', type: 'mcq', question: 'Select the translation for: "Hello"', options: ['Ki kati', 'Webale', 'Kale', 'Eego'], answer: 'Ki kati' },
    { id: 'l1-2', type: 'mcq', question: 'Translate: "Good morning"', options: ['Wasuze otyanno?', 'Osiibye otyanno?', 'Webale munonga'], answer: 'Wasuze otyanno?' },
    { id: 'l1-3', type: 'mcq', question: 'Translate: "Thank you very much"', options: ['Webale munonga', 'Ki kati', 'Simumanyi'], answer: 'Webale munonga' },
    { id: 'l1-4', type: 'mcq', question: 'Response to "Ki kati":', options: ['Bulungi', 'Webale', 'Kale'], answer: 'Bulungi' },
    { id: 'l1-5', type: 'mcq', question: 'Translate: "Good night"', options: ['Sula bulungi', 'Siiba bulungi', 'Ki kati'], answer: 'Sula bulungi' },
    { id: 'l1-6', type: 'mcq', question: 'Match the meaning: "Osiibye otyanno?"', options: ["How was your day?", "Good morning", "Thank you", "Goodbye"], answer: 'How was your day?' },
    { id: 'l1-7', type: 'mcq', question: 'Fill in the blank: "Wasuze otyanno? -> Nasuze ______" (I slept well)', options: ['bulungi', 'malo', 'otya'], answer: 'bulungi' },
    { id: 'l1-8', type: 'mcq', question: 'Translate: "Excuse me / Sorry"', options: ['Nsonyiwa', 'Ki kati', 'Webale'], answer: 'Nsonyiwa' },
    { id: 'l1-9', type: 'mcq', question: 'Match the meaning: "Mweraba"', options: ["Goodbye", "Hello", "Thank you"], answer: 'Goodbye' },
    { id: 'l1-10', type: 'listening', question: 'What greeting do you hear: "ki-ka-ti"?', options: ['Ki kati', 'Webale', 'Wasuze', 'Osiibye'], answer: 'Ki kati' },

    // Unit 2: Time and Days
    { id: 'l2-1', type: 'mcq', question: 'Match the meaning: "Enjuba"', options: ['The Sun', 'The Moon', 'The Stars'], answer: 'The Sun' },
    { id: 'l2-2', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Enkya', 'Eggulo', 'Leero'], answer: 'Enkya' },
    { id: 'l2-3', type: 'mcq', question: 'Translate: "Today"', options: ['Leero', 'Enkya', 'Jjo'], answer: 'Leero' },
    { id: 'l2-4', type: 'mcq', question: 'Match: "Ekiro"', options: ['Night', 'Morning', 'Afternoon'], answer: 'Night' },
    { id: 'l2-5', type: 'mcq', question: 'Translate: "Yesterday"', options: ['Jjo', 'Enkya', 'Leero'], answer: 'Jjo' },
    { id: 'l2-6', type: 'mcq', question: 'Match the meaning: "Kumakya"', options: ["In the morning", "At night", "In the afternoon"], answer: 'In the morning' },
    { id: 'l2-7', type: 'mcq', question: 'Fill in the blank: "______ lwa Kubiri" (Today is Tuesday)', options: ['Leero', 'Enkya', 'Eggulo'], answer: 'Leero' },
    { id: 'l2-8', type: 'mcq', question: 'Translate: "What time is it?"', options: ['Saawa mmeka?', 'Lunaku ki?', 'Ogendawa?'], answer: 'Saawa mmeka?' },
    { id: 'l2-9', type: 'mcq', question: 'Match: "Lwakusatu"', options: ['Wednesday', 'Monday', 'Friday'], answer: 'Wednesday' },
    { id: 'l2-10', type: 'mcq', question: 'Translate: "In the evening"', options: ['Akawungeezi', 'Kumakya', 'Ekiro'], answer: 'Akawungeezi' },

    // Unit 3: Actions
    { id: 'l3-1', type: 'mcq', question: 'Translate: "To eat"', options: ['Okulya', 'Okunnywa', 'Okukola'], answer: 'Okulya' },
    { id: 'l3-2', type: 'mcq', question: 'Translate: "To drink"', options: ['Okunnywa', 'Okulya', 'Okwebaka'], answer: 'Okunnywa' },
    { id: 'l3-3', type: 'mcq', question: 'Match: "Okukola"', options: ['To work', 'To play', 'To sing'], answer: 'To work' },
    { id: 'l3-4', type: 'mcq', question: 'Translate: "To sleep"', options: ['Okwebaka', 'Okuzina', 'Okusoma'], answer: 'Okwebaka' },
    { id: 'l3-5', type: 'mcq', question: 'Match: "Okusoma"', options: ['To read/study', 'To cook', 'To run'], answer: 'To read/study' },
    { id: 'l3-6', type: 'mcq', question: 'Translate: "To cook"', options: ['Okufumba', 'Okulya', 'Okunnywa'], answer: 'Okufumba' },
    { id: 'l3-7', type: 'mcq', question: 'Fill in the blank: "Ndikulya ______" (I am eating food)', options: ['emmere', 'mulimu', 'kitabo'], answer: 'emmere' },
    { id: 'l3-8', type: 'mcq', question: 'Translate: "To walk"', options: ['Okutambula', 'Okwebaka', 'Okuzina'], answer: 'Okutambula' },
    { id: 'l3-9', type: 'mcq', question: 'Match: "Okuzina"', options: ['To dance', 'To sleep', 'To eat'], answer: 'To dance' },
    { id: 'l3-10', type: 'mcq', question: 'Translate: "I am working"', options: ['Nkoola', 'Ndya', 'Nsoma'], answer: 'Nkoola' },

    // Unit 4: Questions
    { id: 'l4-1', type: 'mcq', question: 'Translate: "Where?"', options: ['Wa?', 'Ddi?', 'Ani?'], answer: 'Wa?' },
    { id: 'l4-2', type: 'mcq', question: 'Translate: "When?"', options: ['Ddi?', 'Lwaki?', 'Ki?'], answer: 'Ddi?' },
    { id: 'l4-3', type: 'mcq', question: 'Translate: "Who?"', options: ['Ani?', 'Ki?', 'Wa?'], answer: 'Ani?' },
    { id: 'l4-4', type: 'mcq', question: 'Translate: "What?"', options: ['Ki?', 'Lwaki?', 'Ddi?'], answer: 'Ki?' },
    { id: 'l4-5', type: 'mcq', question: 'Translate: "Why?"', options: ['Lwaki?', 'Ki?', 'Wa?'], answer: 'Lwaki?' },
    { id: 'l4-6', type: 'mcq', question: 'Fill in the blank: "______ ogenda?" (Where are you going?)', options: ['Wa', 'Ddi', 'Ani'], answer: 'Wa' },
    { id: 'l4-7', type: 'mcq', question: 'Translate: "How much?"', options: ['Meka?', 'Wa?', 'Ki?'], answer: 'Meka?' },
    { id: 'l4-8', type: 'mcq', question: 'Rearrange: ogenda / Wa', options: ['Wa ogenda?', 'ogenda Wa?', 'Wa ki?'], answer: 'Wa ogenda?' },
    { id: 'l4-9', type: 'mcq', question: 'Translate: "What is your name?"', options: ['Erinnya lyo ggwe ani?', 'Ogenda wa?', 'Okola ki?'], answer: 'Erinnya lyo ggwe ani?' },
    { id: 'l4-10', type: 'mcq', question: 'Match: "Okola ki?"', options: ['What are you doing?', 'Where are you?', 'Who are you?'], answer: 'What are you doing?' },

    // Unit 5: Market Chat
    { id: 'l5-1', type: 'mcq', question: 'Translate: "Money"', options: ['Ssente', 'Ensawo', 'Emmotoka'], answer: 'Ssente' },
    { id: 'l5-2', type: 'mcq', question: 'Match: "Okugula"', options: ['To buy', 'To sell', 'To trade'], answer: 'To buy' },
    { id: 'l5-3', type: 'mcq', question: 'Translate: "How much?"', options: ['Mmuntunze mmeka?', 'Wa?', 'Ki?'], answer: 'Mmuntunze mmeka?' },
    { id: 'l5-4', type: 'mcq', question: 'Match: "Omutunzi"', options: ['Trader/Seller', 'Buyer', 'Police'], answer: 'Trader/Seller' },
    { id: 'l5-5', type: 'mcq', question: 'Translate: "I want..."', options: ['Njagaala...', 'Nnyanza...', 'Nina...'], answer: 'Njagaala...' },
    { id: 'l5-6', type: 'mcq', question: 'Match the meaning: "Okutunda"', options: ["To sell", "To buy", "To give"], answer: 'To sell' },
    { id: 'l5-7', type: 'mcq', question: 'Fill in the blank: "Njagaala ______ matooke" (I want to buy matooke)', options: ['okugula', 'okutunda', 'okulya'], answer: 'okugula' },
    { id: 'l5-8', type: 'mcq', question: 'Translate: "This is too expensive"', options: ['Kino kya bbeeyi nnyo', 'Kino kya layisi', 'Kino kirungi'], answer: 'Kino kya bbeeyi nnyo' },
    { id: 'l5-9', type: 'mcq', question: 'Dialogue: A: Mmeka? B: ______ (Five thousand)', options: ['Lukatano', 'Enkumi ttaano', 'Emitwalo etaano'], answer: 'Enkumi ttaano' },
    { id: 'l5-10', type: 'mcq', question: 'Translate: "Give me change"', options: ['Mpe kyenji', 'Mpe ssente', 'Mpe emmere'], answer: 'Mpe kyenji' },

    // Unit 6: Advanced
    { id: 'l6-1', type: 'mcq', question: 'Translate: "I am going to the market"', options: ['Ngenda mu katale', 'Ndya matooke', 'Ndi wano'], answer: 'Ngenda mu katale' },
    { id: 'l6-2', type: 'mcq', question: 'Translate: "I like learning Luganda"', options: ['Njagaala okuyiga Oluganda', 'Nsoma bitabo', 'Nina ssente'], answer: 'Njagaala okuyiga Oluganda' },
    { id: 'l6-3', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Ogenda wa?', 'Oli wa?', 'Oguzze ki?'], answer: 'Ogenda wa?' },
    { id: 'l6-4', type: 'mcq', question: 'Translate: "Thank you for the food"', options: ['Webale emmere', 'Webale omulimu', 'Bulungi'], answer: 'Webale emmere' },
    { id: 'l6-5', type: 'mcq', question: 'Translate: "It is a good day"', options: ['Lunaku lulungi', 'Enjuba eyaka', 'Kale munonga'], answer: 'Lunaku lulungi' },
    { id: 'l6-6', type: 'mcq', question: 'Translate: "I went to school yesterday"', options: ['Nagenda ku ssomero jjo', 'Ngenda ku ssomero leero', 'Njagaala okugenda ku ssomero'], answer: 'Nagenda ku ssomero jjo' },
    { id: 'l6-7', type: 'mcq', question: 'Error Correction: "Nze kugula katale"', options: ['Nagula mu katale', 'Nze kugula katale', 'Ngula mu katale'], answer: 'Nagula mu katale' },
    { id: 'l6-8', type: 'mcq', question: 'Conversation: "A: Where do you live? B: I live in Kampala"', options: ['A: Obeera wa? B: Mbeera Kampala', 'A: Ogenda wa? B: Mbeera Kampala', 'A: Oli wa? B: Ndi Kampala'], answer: 'A: Obeera wa? B: Mbeera Kampala' },
    { id: 'l6-9', type: 'mcq', question: 'Fill in: "Njagaala ______ Oluganda" (I like speaking Luganda)', options: ['okwogera', 'okusoma', 'okuwulira'], answer: 'okwogera' },
    { id: 'l6-10', type: 'mcq', question: 'Translate: "I will come back tomorrow"', options: ['Ndyakomawo enkya', 'Nazze jjo', 'Ngenda leero'], answer: 'Ndyakomawo enkya' },

    // Level 2: Unit 7 - Workplace
    { id: 'l7-1', type: 'mcq', question: 'Match: "Ofiisi"', options: ['Office', 'Market', 'House'], answer: 'Office' },
    { id: 'l7-2', type: 'mcq', question: 'Translate: "Ndi mukozi"', options: ['I am a worker', 'I am a student'], answer: 'I am a worker' },
    { id: 'l7-3', type: 'mcq', question: 'Match: "Maneja"', options: ['Manager', 'Teacher', 'Child'], answer: 'Manager' },
    { id: 'l7-4', type: 'mcq', question: 'Fill in: "Nkoola ______" (I am working in the office)', options: ['mu ofiisi', 'mu nnyumba'], answer: 'mu ofiisi' },
    { id: 'l7-5', type: 'mcq', question: 'Match: "Omulimu"', options: ['Work/Job', 'Food', 'Play'], answer: 'Work/Job' },

    // Level 2: Unit 8 - Planning
    { id: 'l8-1', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Enkya', 'Jjo'], answer: 'Enkya' },
    { id: 'l8-2', type: 'mcq', question: 'Translate: "Next week"', options: ['Wiiki ejja', 'Kare'], answer: 'Wiiki ejja' },
    { id: 'l8-3', type: 'mcq', question: 'Fill in: "Ndyaza ______" (I will go tomorrow)', options: ['enkya', 'leero'], answer: 'enkya' },
    { id: 'l8-4', type: 'mcq', question: 'Translate: "I will visit you"', options: ['Ndyakyala okukulaba', 'Ndi awaka'], answer: 'Ndyakyala okukulaba' },
    { id: 'l8-5', type: 'mcq', question: 'Match: "Saawa ssatu"', options: ['9 o\'clock', '3 o\'clock'], answer: '9 o\'clock' },

    // Level 2: Unit 9 - Telling Stories
    { id: 'l9-1', type: 'mcq', question: 'Translate: "Yesterday"', options: ['Jjo', 'Enkya'], answer: 'Jjo' },
    { id: 'l9-2', type: 'mcq', question: 'Fill in: "______ emmere" (I ate food)', options: ['Nalyabye', 'Ndya'], answer: 'Nalyabye' },
    { id: 'l9-3', type: 'mcq', question: 'Translate: "I went home"', options: ['Nagenda awaka', 'Ndi awaka'], answer: 'Nagenda awaka' },
    { id: 'l9-4', type: 'mcq', question: 'Match: "Yagamba"', options: ['He/She said', 'I said'], answer: 'He/She said' },
    { id: 'l9-5', type: 'mcq', question: 'Translate: "I saw them"', options: ['Nabalaba', 'Bandaba'], answer: 'Nabalaba' },

    // Level 2: Unit 10 - Logic & Opinion
    { id: 'l10-1', type: 'mcq', question: 'Match: "Kubanga"', options: ['Because', 'And', 'But'], answer: 'Because' },
    { id: 'l10-2', type: 'mcq', question: 'Translate: "In my view"', options: ['Ategeze kye ndowooza', 'Webale'], answer: 'Ategeze kye ndowooza' },
    { id: 'l10-3', type: 'mcq', question: 'Match: "Nmuyagala kubanga mulungi"', options: ['I love him because he is good', 'I hate him'], answer: 'I love him because he is good' },
    { id: 'l10-4', type: 'mcq', question: 'Translate: "I think that"', options: ['Ndowooza nti', 'Simumanyi'], answer: 'Ndowooza nti' },
    { id: 'l10-5', type: 'mcq', question: 'Match: "Naye"', options: ['But', 'And', 'Or'], answer: 'But' },

    // Level 2: Unit 11 - Travel & Logistics
    { id: 'l11-1', type: 'mcq', question: 'Match: "Tikiti"', options: ['Ticket', 'Money'], answer: 'Tikiti' },
    { id: 'l11-2', type: 'mcq', question: 'Translate: "Migigo"', options: ['Luggage/Bag', 'Car'], answer: 'Migigo' },
    { id: 'l11-3', type: 'mcq', question: 'Match: "Paaka ya taxi"', options: ['Taxi park', 'Airport'], answer: 'Taxi park' },
    { id: 'l11-4', type: 'mcq', question: 'Translate: "Where is my bag?"', options: ['Omugigo gwange guli wa?', 'Ennyumba yange eri wa?'], answer: 'Omugigo gwange guli wa?' },
    { id: 'l11-5', type: 'mcq', question: 'Fill in: "Njagaala ______ awaka" (I want to go home)', options: ['okugenda', 'okulya'], answer: 'okugenda' },

    // Level 2: Unit 12 - Expert Fluency
    { id: 'l12-1', type: 'mcq', question: 'Translate: "Kirungi nnyo"', options: ['Very good', 'Very bad'], answer: 'Very good' },
    { id: 'l12-2', type: 'mcq', question: 'Match: "Kale"', options: ['Okay / Well then', 'Hello'], answer: 'Okay / Well then' },
    { id: 'l12-3', type: 'mcq', question: 'Match: "Tuyambagane"', options: ['Let us help each other', 'Let us play'], answer: 'Let us help each other' },
    { id: 'l12-4', type: 'mcq', question: 'Translate: "I understand"', options: ['Ntegeera', 'Mmanyi'], answer: 'Ntegeera' },
    { id: 'l12-5', type: 'mcq', question: 'Translate: "Perfect"', options: ['Kituufu ddala', 'Kirungi'], answer: 'Kituufu ddala' },

    // Level 3: Unit 13 - Social Relationships
    { id: 'l13-1', type: 'mcq', question: 'Translate: "They are my relatives"', options: ['Bano baluganda lwange', 'Bano mikwano gyange', 'Bano bakozi bange'], answer: 'Bano baluganda lwange' },
    { id: 'l13-2', type: 'mcq', question: 'Match: "Obukwata"', options: ['Connection/Relation', 'Conflict', 'Distance'], answer: 'Connection/Relation' },
    { id: 'l13-3', type: 'mcq', question: 'Translate: "We help each other always"', options: ['Tuyambagana bulijjo', 'Tuzina bulijjo', 'Tulya bulijjo'], answer: 'Tuyambagana bulijjo' },

    // Level 3: Unit 14 - Culture & Tradition
    { id: 'l14-1', type: 'mcq', question: 'Match: "Ennono y\'ekika"', options: ['Clan tradition', 'Modern dance', 'Office rules'], answer: 'Clan tradition' },
    { id: 'l14-2', type: 'mcq', question: 'Translate: "Respecting the King is key"', options: ['Okuwa Kabaka ekitiibwa kikulu', 'Okuwa omuntu amenvu', 'Okuwa omwana ekitabo'], answer: 'Okuwa Kabaka ekitiibwa kikulu' },

    // Level 3: Unit 15 - News & Society
    { id: 'l15-1', type: 'mcq', question: 'Match: "Amawulire ag\'akawabula"', options: ['Latest news', 'Yesterday\'s stories', 'Fake news'], answer: 'Latest news' },
    { id: 'l15-2', type: 'mcq', question: 'Translate: "The community is developing"', options: ['Ekitundu kikulaakulana', 'Ekitundu kifiiridde', 'Ekitundu kirungi'], answer: 'Ekitundu kikulaakulana' },

    // Level 3: Unit 16 - Nature & Environment
    { id: 'l16-1', type: 'mcq', question: 'Match: "Obubonero bw\'obutonde"', options: ['Natural signs', 'Artificial lights', 'Road signs'], answer: 'Natural signs' },
    { id: 'l16-2', type: 'mcq', question: 'Translate: "Planting trees is good"', options: ['Okusimba emiti kirungi', 'Okulya emenvu kirungi', 'Okutambura kirungi'], answer: 'Okusimba emiti kirungi' },

    // Level 4: Unit 17 - Mastery & Idioms
    { id: 'l17-1', type: 'mcq', question: 'Match: "Akuba akasolo bwe kaba kadda"', options: ['Strike while the iron is hot (Wait for the right moment)', 'A small bird is fast', 'The sun is hot'], answer: 'Strike while the iron is hot (Wait for the right moment)' },
    { id: 'l17-2', type: 'mcq', question: 'Translate: "Hurry results in no success"', options: ['Akwatira amangu taba na mulimu', 'Ekibi kiva ku mangu', 'Haraka haraka haina baraka (Swahili influence)', 'Okwanguyira tekuleeta bukugu'], answer: 'Okwanguyira tekuleeta bukugu' },

    // Level 4: Unit 18 - Business & Formalities
    { id: 'l18-1', type: 'mcq', question: 'Match: "Ebyenfuna"', options: ['Economics/Finance', 'Entertainment', 'Gardening'], answer: 'Economics/Finance' },
    { id: 'l18-2', type: 'mcq', question: 'Translate: "We need a formal agreement"', options: ['Twetaaga endagaano entongole', 'Twetaaga emmere', 'Twetaaga sente'], answer: 'Twetaaga endagaano entongole' },

    // Level 4: Unit 19 - History & Antiquity
    { id: 'l19-1', type: 'mcq', question: 'Match: "Ebyafaayo bya Buganda"', options: ['History of Buganda', 'Future of Buganda', 'News about Buganda'], answer: 'History of Buganda' },
    { id: 'l19-2', type: 'mcq', question: 'Translate: "Honoring our ancestors"', options: ['Okuwa bajjajjaffe ekitiibwa', 'Okulya hamwe', 'Okuzina'], answer: 'Okuwa bajjajjaffe ekitiibwa' },

    // Level 4: Unit 20 - Philosophical Thought
    { id: 'l20-1', type: 'mcq', question: 'Match: "Okufumiitiriza ku bulamu"', options: ['Reflecting on life', 'Eating food', 'Walking home'], answer: 'Reflecting on life' },
    { id: 'l20-2', type: 'mcq', question: 'Translate: "Life is a journey"', options: ['Obulamu lugendo', 'Obulamu bulungi', 'Obulamu bubi'], answer: 'Obulamu lugendo' },
  ],
  German: [
    // Module 1: Greetings & Introductions
    { id: 'g1-1', type: 'mcq', question: 'Translate: "Hallo"', options: ['Hello', 'Goodbye', 'Thank you', 'Please'], answer: 'Hello' },
    { id: 'g1-2', type: 'mcq', question: 'How do you say "How are you?" in German?', options: ['Wie geht es dir?', 'Wie heißt du?', 'Wo bist du?'], answer: 'Wie geht es dir?' },
    { id: 'g1-3', type: 'mcq', question: 'Fill in: "Guten ______" (Good morning)', options: ['Morgen', 'Tag', 'Abend'], answer: 'Morgen' },
    { id: 'g1-4', type: 'mcq', question: 'Translate: "Danke schön"', options: ['Thank you very much', 'You are welcome', 'Sorry'], answer: 'Thank you very much' },
    { id: 'g1-5', type: 'mcq', question: 'How do you say: "My name is..."?', options: ['Ich heiße...', 'Ich bin...', 'Ich mag...'], answer: 'Ich heiße...' },
    
    // Module 2: Time
    { id: 'g2-1', type: 'mcq', question: 'Translate: "Heute"', options: ['Today', 'Tomorrow', 'Yesterday'], answer: 'Today' },
    { id: 'g2-2', type: 'mcq', question: 'Translate: "Morgen"', options: ['Tomorrow', 'Morning', 'Today'], answer: 'Tomorrow' },
    { id: 'g2-3', type: 'mcq', question: 'How do you say "Monday" in German?', options: ['Montag', 'Dienstag', 'Freitag'], answer: 'Montag' },
    { id: 'g2-4', type: 'mcq', question: 'What does "Gestern" mean?', options: ['Yesterday', 'Today', 'Tonight'], answer: 'Yesterday' },
    { id: 'g2-5', type: 'mcq', question: 'Fill in: "Heute ist ______" (Today is Friday)', options: ['Freitag', 'Samstag', 'Sonntag'], answer: 'Freitag' },

    // Module 3: Actions
    { id: 'g3-1', type: 'mcq', question: 'Translate: "Essen"', options: ['To eat', 'To drink', 'To sleep'], answer: 'To eat' },
    { id: 'g3-2', type: 'mcq', question: 'Translate: "Trinken"', options: ['To drink', 'To eat', 'To run'], answer: 'To drink' },
    { id: 'g3-3', type: 'mcq', question: 'What is "Ich lese"?', options: ['I read', 'I write', 'I listen'], answer: 'I read' },
    { id: 'g3-4', type: 'mcq', question: 'How do you say "I am working"?', options: ['Ich arbeite', 'Ich schlafe', 'Ich lerne'], answer: 'Ich arbeite' },
    { id: 'g3-5', type: 'mcq', question: 'Translate: "Schreiben"', options: ['To write', 'To read', 'To speak'], answer: 'To write' },

    // Module 4: Questions
    { id: 'g4-1', type: 'mcq', question: 'Translate: "Wer?"', options: ['Who', 'What', 'Where'], answer: 'Who' },
    { id: 'g4-2', type: 'mcq', question: 'Translate: "Was?"', options: ['What', 'Who', 'Where'], answer: 'What' },
    { id: 'g4-3', type: 'mcq', question: 'How do you ask "Where is...?"', options: ['Wo ist...?', 'Wer ist...?', 'Wie ist...?'], answer: 'Wo ist...?' },
    { id: 'g4-4', type: 'mcq', question: 'Translate: "Warum?"', options: ['Why', 'How', 'When'], answer: 'Why' },
    { id: 'g4-5', type: 'mcq', question: 'What is "Wann?"', options: ['When', 'Where', 'Why'], answer: 'When' },

    // Module 5: Conversations (Market)
    { id: 'g5-1', type: 'mcq', question: 'How do you ask "How much does it cost?"', options: ['Wie viel kostet es?', 'Was ist das?', 'Wo ist der Markt?'], answer: 'Wie viel kostet es?' },
    { id: 'g5-2', type: 'mcq', question: 'Translate: "Geld"', options: ['Money', 'Gold', 'Market'], answer: 'Money' },
    { id: 'g5-3', type: 'mcq', question: 'Translate: "Kaufen"', options: ['To buy', 'To sell', 'To trade'], answer: 'To buy' },
    { id: 'g5-4', type: 'mcq', question: 'What is "Teuer"?', options: ['Expensive', 'Cheap', 'Free'], answer: 'Expensive' },
    { id: 'g5-5', type: 'mcq', question: 'Translate: "Ich möchte..."', options: ['I would like...', 'I have...', 'I want...'], answer: 'I would like...' },

    // Module 6: Advanced
    { id: 'g6-1', type: 'mcq', question: 'Translate: "Ich gehe nach Hause, weil ich müde bin"', options: ['I am going home because I am tired', 'I am going to work because I am tired', 'I am staying home because I am tired'], answer: 'I am going home because I am tired' },
    { id: 'g6-2', type: 'mcq', question: 'Fill in: "Ich ______ gestern Deutsch gelernt" (I studied German yesterday)', options: ['habe', 'bin', 'werde'], answer: 'habe' },
    { id: 'g6-3', type: 'mcq', question: 'Translate: "Ich werde morgen kommen"', options: ['I will come tomorrow', 'I came yesterday', 'I am coming today'], answer: 'I will come tomorrow' },
    { id: 'g6-4', type: 'mcq', question: 'Correct the error: "Ich gehen zum Markt"', options: ['Ich gehe zum Markt', 'Ich gehe Markt', 'Ich geht zum Markt'], answer: 'Ich gehe zum Markt' },
    { id: 'g6-5', type: 'mcq', question: 'What is the plural of "Das Buch"?', options: ['Die Bücher', 'Das Buchs', 'Die Bucher'], answer: 'Die Bücher' },

    // Level 2: Unit 7 - Workplace
    { id: 'g7-1', type: 'mcq', question: 'Translate: "Das Büro"', options: ['The office', 'The desk', 'The computer'], answer: 'The office' },
    { id: 'g7-2', type: 'mcq', question: 'How do you say "meeting"?', options: ['Besprechung', 'Arbeit', 'Chef'], answer: 'Besprechung' },
    { id: 'g7-3', type: 'mcq', question: 'Translate: "Ich habe eine E-Mail geschrieben"', options: ['I wrote an email', 'I am writing an email', 'I will write an email'], answer: 'I wrote an email' },
    { id: 'g7-4', type: 'mcq', question: 'What is "Der Chef"?', options: ['The boss', 'The chef', 'The colleague'], answer: 'The boss' },
    { id: 'g7-5', type: 'mcq', question: 'Translate: "Die Arbeit"', options: ['The work', 'The office', 'The company'], answer: 'The work' },

    // Level 2: Unit 8 - Future
    { id: 'g8-1', type: 'mcq', question: 'How do you say "Next week"?', options: ['Nächste Woche', 'Letzte Woche', 'Diese Woche'], answer: 'Nächste Woche' },
    { id: 'g8-2', type: 'mcq', question: 'Translate: "Ich werde verreisen"', options: ['I will travel', 'I am traveling', 'I traveled'], answer: 'I will travel' },
    { id: 'g8-3', type: 'mcq', question: 'Translate: "Bald"', options: ['Soon', 'Later', 'Never'], answer: 'Soon' },
    { id: 'g8-4', type: 'mcq', question: 'Fill in: "Ich hoffe, ______ es regnet" (I hope that it rains)', options: ['dass', 'denn', 'weil'], answer: 'dass' },
    { id: 'g8-5', type: 'mcq', question: 'Translate: "In der Zukunft"', options: ['In the future', 'In the past', 'In the moment'], answer: 'In the future' },

    // Level 2: Unit 9 - Past
    { id: 'g9-1', type: 'mcq', question: 'Translate: "Gestern war ich im Park"', options: ['Yesterday I was in the park', 'Today I am in the park', 'Tomorrow I will be in the park'], answer: 'Yesterday I was in the park' },
    { id: 'g9-2', type: 'mcq', question: 'How do you say "I forgot"?', options: ['Ich habe vergessen', 'Ich vergesse', 'Ich werde vergessen'], answer: 'Ich habe vergessen' },
    { id: 'g9-3', type: 'mcq', question: 'Translate: "Es war einmal..."', options: ['Once upon a time...', 'It was once...', 'It happened once...'], answer: 'Once upon a time...' },
    { id: 'g9-4', type: 'mcq', question: 'Translate: "Vor einem Jahr"', options: ['A year ago', 'In a year', 'Every year'], answer: 'A year ago' },
    { id: 'g9-5', type: 'mcq', question: 'What is "Die Geschichte"?', options: ['The story', 'The history', 'Both A and B'], answer: 'Both A and B' },

    // Level 2: Unit 10 - Opinion
    { id: 'g10-1', type: 'mcq', question: 'How do you say "In my opinion"?', options: ['Meiner Meinung nach', 'Ich denke das', 'Vielleicht'], answer: 'Meiner Meinung nach' },
    { id: 'g10-2', type: 'mcq', question: 'Translate: "Ich finde, dass..."', options: ['I find that...', 'I think that...', 'I believe that...'], answer: 'I find that...' },
    { id: 'g10-3', type: 'mcq', question: 'Translate: "Vielleicht"', options: ['Maybe', 'Definitely', 'Never'], answer: 'Maybe' },
    { id: 'g10-4', type: 'mcq', question: 'How do you say "I agree"?', options: ['Ich stimme zu', 'Ich bin dagegen', 'Ich weiß nicht'], answer: 'Ich stimme zu' },
    { id: 'g10-5', type: 'mcq', question: 'Translate: "Wichtig"', options: ['Important', 'Useless', 'Difficult'], answer: 'Important' },

    // Level 2: Unit 11 - Logistics
    { id: 'g11-1', type: 'mcq', question: 'Translate: "Der Flughafen"', options: ['The airport', 'The train station', 'The bus stop'], answer: 'The airport' },
    { id: 'g11-2', type: 'mcq', question: 'What is "Die Fahrkarte"?', options: ['The ticket', 'The map', 'The passport'], answer: 'The ticket' },
    { id: 'g11-3', type: 'mcq', question: 'Translate: "Wo ist mein Koffer?"', options: ['Where is my suitcase?', 'Where is my bag?', 'Where is my passport?'], answer: 'Where is my suitcase?' },
    { id: 'g11-4', type: 'mcq', question: 'How do you say "reservation"?', options: ['Reservierung', 'Buchung', 'Both A and B'], answer: 'Both A and B' },
    { id: 'g11-5', type: 'mcq', question: 'Translate: "Gute Reise!"', options: ['Have a good trip!', 'Good luck!', 'Safe travels!'], answer: 'Have a good trip!' },

    // Level 2: Unit 12 - Expert
    { id: 'g12-1', type: 'mcq', question: 'Translate: "Übung macht den Meister"', options: ['Practice makes perfect', 'Work hard', 'Learn everything'], answer: 'Practice makes perfect' },
    { id: 'g12-2', type: 'mcq', question: 'How do you say "flawless"?', options: ['Makellos', 'Perfekt', 'Sehr gut'], answer: 'Makellos' },
    { id: 'g12-3', type: 'mcq', question: 'Translate: "Ich beherrsche die Sprache"', options: ['I master the language', 'I speak the language', 'I learn the language'], answer: 'I master the language' },
    { id: 'g12-4', type: 'mcq', question: 'What is "Verständnis"?', options: ['Understanding', 'Agreement', 'Patience'], answer: 'Understanding' },
    { id: 'g12-5', type: 'mcq', question: 'Translate: "Ausgezeichnet"', options: ['Excellent', 'Good', 'Average'], answer: 'Excellent' },

    // Level 3: Unit 13 - Gesellschaft
    { id: 'g13-1', type: 'mcq', question: 'Translate: "The society is changing"', options: ['Die Gesellschaft verändert sich', 'Die Stadt ist groß', 'Das Wetter ist schön'], answer: 'Die Gesellschaft verändert sich' },
    { id: 'g13-2', type: 'mcq', question: 'Match: "Verantwortung"', options: ['Responsibility', 'Freedom', 'Justice'], answer: 'Responsibility' },
    
    // Level 3: Unit 14 - Kultur
    { id: 'g14-1', type: 'mcq', question: 'Match: "Kulturerbe"', options: ['Cultural heritage', 'Museum', 'Painting'], answer: 'Cultural heritage' },
    { id: 'g14-2', type: 'mcq', question: 'Translate: "Traditions are important"', options: ['Traditionen sind wichtig', 'Essen ist gut', 'Musik ist laut'], answer: 'Traditionen sind wichtig' },
    
    // Level 3: Unit 15 - Nachrichten
    { id: 'g15-1', type: 'mcq', question: 'Match: "Wirtschaft"', options: ['Economy', 'Politics', 'Sports'], answer: 'Economy' },
    { id: 'g15-2', type: 'mcq', question: 'Translate: "The world news today"', options: ['Die Weltnachrichten heute', 'Das Radio spielt', 'Ich lese'], answer: 'Die Weltnachrichten heute' },

    // Level 3: Unit 16 - Natur
    { id: 'g16-1', type: 'mcq', question: 'Match: "Umweltschutz"', options: ['Environmental protection', 'Weather', 'Forest'], answer: 'Environmental protection' },
    { id: 'g16-2', type: 'mcq', question: 'Translate: "Climate change is real"', options: ['Der Klimawandel ist real', 'Es regnet', 'Die Sonne scheint'], answer: 'Der Klimawandel ist real' },

    // Level 4: Unit 17 - Redewendungen
    { id: 'g17-1', type: 'mcq', question: 'Match: "Übung macht den Meister"', options: ['Practice makes perfect', 'All is well', 'Hurry makes waste'], answer: 'Practice makes perfect' },
    { id: 'g17-2', type: 'mcq', question: 'Translate: "Ende gut, alles gut"', options: ['All\'s well that ends well', 'Good morning', 'Goodbye'], answer: 'All\'s well that ends well' },

    // Level 4: Unit 18 - Beruf
    { id: 'g18-1', type: 'mcq', question: 'Match: "Unternehmensführung"', options: ['Corporate management', 'Office work', 'Salary'], answer: 'Corporate management' },
    { id: 'g18-2', type: 'mcq', question: 'Translate: "Wir brauchen eine neue Strategie"', options: ['Wir brauchen eine neue Strategie', 'Wir brauchen Zeit', 'Wir brauchen Geld'], answer: 'Wir brauchen eine neue Strategie' },

    // Level 4: Unit 19 - Geschichte
    { id: 'g19-1', type: 'mcq', question: 'Match: "Zeitgeschichte"', options: ['Contemporary history', 'Ancient times', 'Future'], answer: 'Contemporary history' },
    { id: 'g19-2', type: 'mcq', question: 'Translate: "Die Geschichte wiederholt sich"', options: ['Die Geschichte wiederholt sich', 'Die Zeit vergeht', 'Das Leben ist kurz'], answer: 'Die Geschichte wiederholt sich' },

    // Level 4: Unit 20 - Philosophie
    { id: 'g20-1', type: 'mcq', question: 'Match: "Existenzialismus"', options: ['Existentialism', 'Idealism', 'Realism'], answer: 'Existentialism' },
    { id: 'g20-2', type: 'mcq', question: 'Translate: "Wissen ist Macht"', options: ['Wissen ist Macht', 'Liebe ist alles', 'Zeit ist Geld'], answer: 'Wissen ist Macht' },
  ],
  French: [
    // Module 1: Greetings & Introductions
    { id: 'f1-1', type: 'mcq', question: 'Translate: "Bonjour"', options: ['Hello', 'Goodbye', 'Thank you'], answer: 'Hello' },
    { id: 'f1-2', type: 'mcq', question: 'How do you say "How are you?" in French?', options: ['Comment ça va?', 'Comment t\'appelles-tu?', 'Où es-tu?'], answer: 'Comment ça va?' },
    { id: 'f1-3', type: 'mcq', question: 'Fill in: "Enchanté(e)" (Nice to ______ you)', options: ['meet', 'see', 'hear'], answer: 'meet' },
    { id: 'f1-4', type: 'mcq', question: 'Translate: "Merci beaucoup"', options: ['Thank you very much', 'Please', 'Excuse me'], answer: 'Thank you very much' },
    { id: 'f1-5', type: 'mcq', question: 'How do you say: "My name is..."?', options: ['Je m\'appelle...', 'Je suis...', 'J\'ai...'], answer: 'Je m\'appelle...' },

    // Module 2: Time
    { id: 'f2-1', type: 'mcq', question: 'Translate: "Lundi"', options: ['Monday', 'Tuesday', 'Sunday'], answer: 'Monday' },
    { id: 'f2-2', type: 'mcq', question: 'Translate: "Demain"', options: ['Tomorrow', 'Today', 'Yesterday'], answer: 'Tomorrow' },
    { id: 'f2-3', type: 'mcq', question: 'How do you say "Today" in French?', options: ['Aujourd\'hui', 'Demain', 'Hier'], answer: 'Aujourd\'hui' },
    { id: 'f2-4', type: 'mcq', question: 'What does "Hier" mean?', options: ['Yesterday', 'Today', 'Tonight'], answer: 'Hier' },
    { id: 'f2-5', type: 'mcq', question: 'Fill in: "C\'est ______" (It is Saturday)', options: ['samedi', 'dimanche', 'vendredi'], answer: 'samedi' },

    // Module 3: Actions
    { id: 'f3-1', type: 'mcq', question: 'Translate: "Manger"', options: ['To eat', 'To drink', 'To sleep'], answer: 'To eat' },
    { id: 'f3-2', type: 'mcq', question: 'Translate: "Boire"', options: ['To drink', 'To eat', 'To run'], answer: 'To drink' },
    { id: 'f3-3', type: 'mcq', question: 'What is "Je lis"?', options: ['I read', 'I write', 'I listen'], answer: 'I read' },
    { id: 'f3-4', type: 'mcq', question: 'How do you say "I am working"?', options: ['Je travaille', 'Je dors', 'Je parle'], answer: 'Je travaille' },
    { id: 'f3-5', type: 'mcq', question: 'Translate: "Écrire"', options: ['To write', 'To read', 'To speak'], answer: 'To write' },

    // Module 4: Questions
    { id: 'f4-1', type: 'mcq', question: 'Translate: "Qui?"', options: ['Who', 'What', 'Where'], answer: 'Who' },
    { id: 'f4-2', type: 'mcq', question: 'Translate: "Quoi?"', options: ['What', 'Who', 'Where'], answer: 'What' },
    { id: 'f4-3', type: 'mcq', question: 'How do you ask "Where is...?"', options: ['Où est...?', 'Qui est...?', 'Pourquoi est...?'], answer: 'Où est...?' },
    { id: 'f4-4', type: 'mcq', question: 'Translate: "Pourquoi?"', options: ['Why', 'How', 'When'], answer: 'Why' },
    { id: 'f4-5', type: 'mcq', question: 'What is "Quand?"', options: ['When', 'Where', 'Why'], answer: 'When' },

    // Module 5: Conversations (Market)
    { id: 'f5-1', type: 'mcq', question: 'How do you ask "How much does it cost?"', options: ['Combien ça coûte?', 'Qu\'est-ce que c\'est?', 'Où est le marché?'], answer: 'Combien ça coûte?' },
    { id: 'f5-2', type: 'mcq', question: 'Translate: "L\'argent"', options: ['Money', 'Gold', 'Market'], answer: 'Money' },
    { id: 'f5-3', type: 'mcq', question: 'Translate: "Acheter"', options: ['To buy', 'To sell', 'To trade'], answer: 'To buy' },
    { id: 'f5-4', type: 'mcq', question: 'What is "Cher"?', options: ['Expensive', 'Cheap', 'Free'], answer: 'Expensive' },
    { id: 'f5-5', type: 'mcq', question: 'Translate: "Je voudrais..."', options: ['I would like...', 'I have...', 'I want...'], answer: 'I would like...' },

    // Module 6: Advanced
    { id: 'f6-1', type: 'mcq', question: 'Translate: "Je rentre à la maison parce que je suis fatigué(e)"', options: ['I am going home because I am tired', 'I am going to work because I am tired', 'I am staying home because I am tired'], answer: 'I am going home because I am tired' },
    { id: 'f6-2', type: 'mcq', question: 'Fill in: "J\'______ étudié le français hier" (I studied French yesterday)', options: ['ai', 'suis', 'vais'], answer: 'ai' },
    { id: 'f6-3', type: 'mcq', question: 'Translate: "Je viendrai demain"', options: ['I will come tomorrow', 'I came yesterday', 'I am coming today'], answer: 'I will come tomorrow' },
    { id: 'f6-4', type: 'mcq', question: 'Correct the error: "Je vais au marché"', options: ['Je vais au marché', 'Je vais à marché', 'Je aller au marché'], answer: 'Je vais au marché' },
    { id: 'f6-5', type: 'mcq', question: 'What is the plural of "Le livre"?', options: ['Les livres', 'Le livres', 'Des livres'], answer: 'Les livres' },

    // Level 2: Unit 7 - Workplace
    { id: 'f7-1', type: 'mcq', question: 'Translate: "Le bureau"', options: ['The office', 'The table', 'The chair'], answer: 'The office' },
    { id: 'f7-2', type: 'mcq', question: 'How do you say "meeting"?', options: ['Réunion', 'Travail', 'Chef'], answer: 'Réunion' },
    { id: 'f7-3', type: 'mcq', question: 'Translate: "J\'ai écrit un e-mail"', options: ['I wrote an email', 'I am writing an email', 'I will write an email'], answer: 'I wrote an email' },
    { id: 'f7-4', type: 'mcq', question: 'What is "Le patron"?', options: ['The boss', 'The patron', 'The colleague'], answer: 'The boss' },
    { id: 'f7-5', type: 'mcq', question: 'Translate: "Le travail"', options: ['The work', 'The office', 'The company'], answer: 'The work' },

    // Level 2: Unit 8 - Future
    { id: 'f8-1', type: 'mcq', question: 'How do you say "Next week"?', options: ['La semaine prochaine', 'La semaine dernière', 'Cette semaine'], answer: 'La semaine prochaine' },
    { id: 'f8-2', type: 'mcq', question: 'Translate: "Je vais voyager"', options: ['I am going to travel', 'I traveled', 'I travel'], answer: 'I am going to travel' },
    { id: 'f8-3', type: 'mcq', question: 'Translate: "Bientôt"', options: ['Soon', 'Later', 'Never'], answer: 'Soon' },
    { id: 'f8-4', type: 'mcq', question: 'Fill in: "J\'espère ______ il pleuvra" (I hope that it will rain)', options: ['qu\'', 'que', 'car'], answer: 'qu\'' },
    { id: 'f8-5', type: 'mcq', question: 'Translate: "À l\'avenir"', options: ['In the future', 'In the past', 'In the moment'], answer: 'À l\'avenir' },

    // Level 2: Unit 9 - Past
    { id: 'f9-1', type: 'mcq', question: 'Translate: "Hier, j\'étais au parc"', options: ['Yesterday I was in the park', 'Today I am in the park', 'Tomorrow I will be in the park'], answer: 'Yesterday I was in the park' },
    { id: 'f9-2', type: 'mcq', question: 'How do you say "I forgot"?', options: ['J\'ai oublié', 'J\'oublie', 'Je vais oublier'], answer: 'J\'ai oublié' },
    { id: 'f9-3', type: 'mcq', question: 'Translate: "Il était une fois..."', options: ['Once upon a time...', 'It was once...', 'It happened once...'], answer: 'Once upon a time...' },
    { id: 'f9-4', type: 'mcq', question: 'Translate: "Il y a un an"', options: ['A year ago', 'In a year', 'Every year'], answer: 'A year ago' },
    { id: 'f9-5', type: 'mcq', question: 'What is "L\'histoire"?', options: ['The story', 'The history', 'Both A and B'], answer: 'Both A and B' },

    // Level 2: Unit 10 - Opinion
    { id: 'f10-1', type: 'mcq', question: 'How do you say "In my opinion"?', options: ['À mon avis', 'Je pense que', 'Peut-être'], answer: 'À mon avis' },
    { id: 'f10-2', type: 'mcq', question: 'Translate: "Je trouve que..."', options: ['I find that...', 'I think that...', 'I believe that...'], answer: 'I find that...' },
    { id: 'f10-3', type: 'mcq', question: 'Translate: "Peut-être"', options: ['Maybe', 'Definitely', 'Never'], answer: 'Maybe' },
    { id: 'f10-4', type: 'mcq', question: 'How do you say "I agree"?', options: ['Je suis d\'accord', 'Je ne suis pas d\'accord', 'Je ne sais pas'], answer: 'Je suis d\'accord' },
    { id: 'f10-5', type: 'mcq', question: 'Translate: "Important"', options: ['Important', 'Inutile', 'Difficile'], answer: 'Important' },

    // Level 2: Unit 11 - Logistics
    { id: 'f11-1', type: 'mcq', question: 'Translate: "L\'aéroport"', options: ['The airport', 'The train station', 'The bus stop'], answer: 'L\'aéroport' },
    { id: 'f11-2', type: 'mcq', question: 'What is "Le billet"?', options: ['The ticket', 'The map', 'The passport'], answer: 'The ticket' },
    { id: 'f11-3', type: 'mcq', question: 'Translate: "Où est ma valise?"', options: ['Where is my suitcase?', 'Where is my bag?', 'Where is my passport?'], answer: 'Where is my suitcase?' },
    { id: 'f11-4', type: 'mcq', question: 'How do you say "reservation"?', options: ['Réservation', 'Booking', 'Both A and B'], answer: 'Réservation' },
    { id: 'f11-5', type: 'mcq', question: 'Translate: "Bon voyage !"', options: ['Have a good trip!', 'Good luck!', 'Safe travels!'], answer: 'Bon voyage !' },

    // Level 2: Unit 12 - Expert
    { id: 'f12-1', type: 'mcq', question: 'Translate: "C\'est en forgeant qu\'on devient forgeron"', options: ['Practice makes perfect', 'Work hard', 'Learn everything'], answer: 'Practice makes perfect' },
    { id: 'f12-2', type: 'mcq', question: 'How do you say "flawless"?', options: ['Sans faute', 'Parfait', 'Très bien'], answer: 'Sans faute' },
    { id: 'f12-3', type: 'mcq', question: 'Translate: "Je maîtrise la langue"', options: ['I master the language', 'I speak the language', 'I learn the language'], answer: 'I master the language' },
    { id: 'f12-4', type: 'mcq', question: 'What is "La compréhension"?', options: ['Understanding', 'Agreement', 'Patience'], answer: 'Understanding' },
    { id: 'f12-5', type: 'mcq', question: 'Translate: "Excellent"', options: ['Excellent', 'Bon', 'Moyen'], answer: 'Excellent' },

    // Level 3: Unit 13 - Société
    { id: 'f13-1', type: 'mcq', question: 'Translate: "La société est diverse"', options: ['La société est diverse', 'La ville est grande', 'Il fait beau'], answer: 'La société est diverse' },
    { id: 'f13-2', type: 'mcq', question: 'Match: "Égalité"', options: ['Equality', 'Freedom', 'Justice'], answer: 'Equality' },

    // Level 3: Unit 14 - Culture
    { id: 'f14-1', type: 'mcq', question: 'Match: "Patrimoine"', options: ['Heritage', 'Museum', 'Art'], answer: 'Heritage' },
    { id: 'f14-2', type: 'mcq', question: 'Translate: "La culture est essentielle"', options: ['La culture est essentielle', 'Le pain est bon', 'La musique est forte'], answer: 'La culture est essentielle' },

    // Level 3: Unit 15 - Actualités
    { id: 'f15-1', type: 'mcq', question: 'Match: "Mondialisation"', options: ['Globalization', 'Politics', 'Sports'], answer: 'Globalization' },
    { id: 'f15-2', type: 'mcq', question: 'Translate: "Les actualités internationales"', options: ['Les actualités internationales', 'La radio', 'Le journal'], answer: 'Les actualités internationales' },

    // Level 3: Unit 16 - Environnement
    { id: 'f16-1', type: 'mcq', question: 'Match: "Développement durable"', options: ['Sustainable development', 'Nature', 'Forest'], answer: 'Sustainable development' },
    { id: 'f16-2', type: 'mcq', question: 'Translate: "Préserver la biodiversité"', options: ['Préserver la biodiversité', 'Il pleut', 'Le soleil brille'], answer: 'Préserver la biodiversité' },

    // Level 4: Unit 17 - Idiotismes
    { id: 'f17-1', type: 'mcq', question: 'Match: "Petit à petit, l\'oiseau fait son nid"', options: ['Step by step, one goes far', 'Life is beautiful', 'Time is money'], answer: 'Step by step, one goes far' },
    { id: 'f17-2', type: 'mcq', question: 'Translate: "Mieux vaut tard que jamais"', options: ['Mieux vaut tard que jamais', 'Bonjour', 'Au revoir'], answer: 'Mieux vaut tard que jamais' },

    // Level 4: Unit 18 - Affaires
    { id: 'f18-1', type: 'mcq', question: 'Match: "Entrepreneuriat"', options: ['Entrepreneurship', 'Office', 'Salary'], answer: 'Entrepreneurship' },
    { id: 'f18-2', type: 'mcq', question: 'Translate: "Un marché compétitif"', options: ['Un marché compétitif', 'Un marché libre', 'Un marché fermé'], answer: 'Un marché compétitif' },

    // Level 4: Unit 19 - Histoire
    { id: 'f19-1', type: 'mcq', question: 'Match: "Ancien Régime"', options: ['Old Regime/Kingdom', 'Future', 'Today'], answer: 'Old Regime/Kingdom' },
    { id: 'f19-2', type: 'mcq', question: 'Translate: "Liberté, Égalité, Fraternité"', options: ['Liberté, Égalité, Fraternité', 'Un pour tous', 'Vive la France'], answer: 'Liberté, Égalité, Fraternité' },

    // Level 4: Unit 20 - Philosophie
    { id: 'f20-1', type: 'mcq', question: 'Match: "Lumières"', options: ['Enlightenment', 'Sunlight', 'Darkness'], answer: 'Enlightenment' },
    { id: 'f20-2', type: 'mcq', question: 'Translate: "Je pense, donc je suis"', options: ['Je pense, donc je suis', 'Je suis ici', 'C\'est la vie'], answer: 'Je pense, donc je suis' },
  ]
}