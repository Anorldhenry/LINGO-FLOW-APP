'use client'

import { useState, useEffect, Suspense, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, Heart, Volume2, Check, XCircle, Trophy, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type LessonItem = {
  id: string
  type: 'mcq' | 'translation' | 'listening'
  question: string
  options?: string[]
  answer: string
}

// MOCK DATA structure handling our 3 starter languages
const LESSON_BANKS: Record<string, LessonItem[]> = {
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
    
    // Module 4: Asking Questions
    { id: 'a4-1', type: 'mcq', question: 'Match the meaning: "Ayna"', options: ["where", "who", "what", "how"], answer: 'where' },
    { id: 'a4-2', type: 'mcq', question: 'Match the meaning: "Man"', options: ["who", "what", "where", "why"], answer: 'who' },
    { id: 'a4-3', type: 'mcq', question: 'Fill in the blank: Ila ______ tadh-hab? (Where?)', options: ['Ayna', 'Man', 'Madha'], answer: 'Ayna' },
    { id: 'a4-4', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Ila ayna tadh-hab?', 'Madha taf\'al?', 'Min ayna ant?'], answer: 'Ila ayna tadh-hab?' },
    
    // Module 5: Conversations
    { id: 'a5-1', type: 'mcq', question: 'Match the meaning: "Uridu an ashtari"', options: ["I am selling", "I want to buy", "money", "market"], answer: 'I want to buy' },
    { id: 'a5-2', type: 'mcq', question: 'Dialogue Completion - A: Bikam? B: ______ (Translate: 500)', options: ['Khams mi\'ah', 'Arba\' mi\'ah', 'Sitt mi\'ah'], answer: 'Khams mi\'ah' },
    { id: 'a5-3', type: 'mcq', question: 'Translate: "I want to buy food"', options: ['Uridu an ashtari ta\'aman', 'Uridu an ashtari ma\'an', 'Uridu an ashtari fawakih'], answer: 'Uridu an ashtari ta\'aman' },
    
    // LEVEL 3-5: ADVANCED
    { id: 'a6-1', type: 'mcq', question: 'Phrase-Guided Translation: "I want to go home because I am tired"', options: ['Uridu an adh-haba ila al-bayt li-anni mut\'ab', 'Uridu an adh-haba ila al-madrasah li-anni mut\'ab', 'Uridu an adh-haba ila as-suq li-anni mut\'ab'], answer: 'Uridu an adh-haba ila al-bayt li-anni mut\'ab' },
    { id: 'a6-2', type: 'mcq', question: 'Conversation: "A: Where are you going? B: I am going to the market."', options: ['A: Ila ayna tadh-hab? B: Adh-habu ila as-suq', 'A: Madha taf\'al? B: Adh-habu ila as-suq', 'A: Min ayna ant? B: Adh-habu ila as-suq'], answer: 'A: Ila ayna tadh-hab? B: Adh-habu ila as-suq' },
    { id: 'a6-3', type: 'mcq', question: 'Fill-in Translation: ______ ghadan (I will go tomorrow)', options: ['Sa-adh-habu', 'Sa-akul', 'Sa-anam'], answer: 'Sa-adh-habu' },
    { id: 'a6-4', type: 'mcq', question: 'Error Correction: "Ana adh-hab suq ams" (I went to the market yesterday)', options: ['Dhahabtu ila as-suq ams', 'Ana dhahabtu as-suq ams', 'Adh-habu as-suq ams'], answer: 'Dhahabtu ila as-suq ams' },
    { id: 'a6-5', type: 'mcq', question: 'Scenario: "I studied at school. I have experience."', options: ['Darastu fi al-madrasah. Lidayya khibrah.', 'Adrusu fi al-madrasah. Lidayya khibrah.', 'Dhahabtu ila al-madrasah. Lidayya khibrah.'], answer: 'Darastu fi al-madrasah. Lidayya khibrah.' },
    { id: 'a6-6', type: 'mcq', question: 'Reverse Thinking: Create "I will eat"', options: ['Sa-akul', 'Akaltu', 'Akul'], answer: 'Sa-akul' },
    { id: 'a6-7', type: 'mcq', question: 'Long Story: "Yesterday I went to the market..."', options: ['Ams dhahabtu ila as-suq. Ishtaraytu ta\'aman wa ma\'an.', 'Ams dhahabtu ila as-suq. Ishtaraytu fawakih.', 'Ams dhahabtu ila as-suq. Ishtaraytu malabis.'], answer: 'Ams dhahabtu ila as-suq. Ishtaraytu ta\'aman wa ma\'an.' },
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
    
    // Module 4: Asking Questions
    { id: 'k4-1', type: 'mcq', question: 'Match the meaning: "Wapi"', options: ["where", "who", "what", "how"], answer: 'where' },
    { id: 'k4-2', type: 'mcq', question: 'Match the meaning: "Nani"', options: ["who", "what", "where", "why"], answer: 'who' },
    { id: 'k4-3', type: 'mcq', question: 'Fill in the blank: ______ unakwenda? (Where?)', options: ['Wapi', 'Nani', 'Nini'], answer: 'Wapi' },
    { id: 'k4-4', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Unakwenda wapi?', 'Unafanya nini?', 'Unatoka wapi?'], answer: 'Unakwenda wapi?' },
    
    // Module 5: Conversations
    { id: 'k5-1', type: 'mcq', question: 'Match the meaning: "Nataka kununua"', options: ["I am selling", "I want to buy", "money", "market"], answer: 'I want to buy' },
    { id: 'k5-2', type: 'mcq', question: 'Dialogue Completion - A: Bei gani? B: ______ (Translate: 500)', options: ['Mia tano', 'Mia nne', 'Mia sita'], answer: 'Mia tano' },
    { id: 'k5-3', type: 'mcq', question: 'Translate: "I want to buy food"', options: ['Nataka kununua chakula', 'Nataka kununua maji', 'Nataka kununua matunda'], answer: 'Nataka kununua chakula' },
    
    // LEVEL 3-5: ADVANCED
    { id: 'k6-1', type: 'mcq', question: 'Phrase-Guided Translation: "I want to go home because I am tired"', options: ['Nataka kwenda nyumbani kwa sababu nimechoka', 'Nataka kwenda shule kwa sababu nimechoka', 'Nataka kwenda sokoni kwa sababu nimechoka'], answer: 'Nataka kwenda nyumbani kwa sababu nimechoka' },
    { id: 'k6-2', type: 'mcq', question: 'Conversation: "A: Where are you going? B: I am going to the market."', options: ['A: Unakwenda wapi? B: Ninaenda sokoni', 'A: Unafanya nini? B: Ninaenda sokoni', 'A: Unatoka wapi? B: Ninaenda sokoni'], answer: 'A: Unakwenda wapi? B: Ninaenda sokoni' },
    { id: 'k6-3', type: 'mcq', question: 'Fill-in Translation: Nita______ kesho (I will go tomorrow)', options: ['enda', 'kula', 'lala'], answer: 'enda' },
    { id: 'k6-4', type: 'mcq', question: 'Error Correction: "Mimi kwenda soko jana"', options: ['Nilienda sokoni jana', 'Mimi nilienda soko jana', 'Ninaenda sokoni jana'], answer: 'Nilienda sokoni jana' },
    { id: 'k6-5', type: 'mcq', question: 'Scenario: "I studied at school. I have experience."', options: ['Nilisoma shuleni. Nina uzoefu.', 'Ninasoma shuleni. Nina uzoefu.', 'Nilienda shuleni. Nina uzoefu.'], answer: 'Nilisoma shuleni. Nina uzoefu.' },
    { id: 'k6-6', type: 'mcq', question: 'Reverse Thinking: Create "I will eat"', options: ['Nitakula', 'Nilikula', 'Ninakula'], answer: 'Nitakula' },
    { id: 'k6-7', type: 'mcq', question: 'Long Story: "Yesterday I went to the market..."', options: ['Jana nilienda sokoni. Nilinunua chakula na maji.', 'Jana nilienda sokoni. Nilinunua matunda.', 'Jana nilienda sokoni. Nilinunua nguo.'], answer: 'Jana nilienda sokoni. Nilinunua chakula na maji.' },
  ],
  Runyankore: [
    // Unit 1: Greetings
    { id: 'r1-1', type: 'mcq', question: 'Select the translation for: "Hello"', options: ['Agandi', 'Mwebare', 'Kare', 'Eego'], answer: 'Agandi' },
    { id: 'r1-2', type: 'listening', question: 'What do you hear?', options: ['Oraire ota?', 'Osiibire ota?', 'Webare munonga', 'Agandi ge?'], answer: 'Oraire ota?' },
    { id: 'r1-3', type: 'mcq', question: 'Translate: "Thank you very much"', options: ['Webare munonga', 'Agandi', 'Tinkumanya'], answer: 'Webare munonga' },
    { id: 'r1-4', type: 'mcq', question: 'Response to "Agandi":', options: ['Nungi', 'Mwebare', 'Kare'], answer: 'Nungi' },
    { id: 'r1-5', type: 'mcq', question: 'Translate: "Good night"', options: ['Oraire gye', 'Osiibire gye', 'Agandi'], answer: 'Oraire gye' },

    // Unit 2: Time and Days
    { id: 'r2-1', type: 'mcq', question: 'Match the meaning: "Eizoba"', options: ['The Sun / Day', 'The Moon', 'The Stars'], answer: 'The Sun / Day' },
    { id: 'r2-2', type: 'mcq', question: 'Translate: "Tomorrow"', options: ['Nyencakare', 'Nyomwabazyo', 'Eizooba'], answer: 'Nyencakare' },
    { id: 'r2-3', type: 'mcq', question: 'Translate: "Today"', options: ['Erizooba', 'Nyencakare', 'Kare'], answer: 'Erizooba' },
    { id: 'r2-4', type: 'mcq', question: 'Match: "Ekiro"', options: ['Night', 'Morning', 'Afternoon'], answer: 'Night' },
    { id: 'r2-5', type: 'mcq', question: 'Translate: "Yesterday"', options: ['Nyomwabazyo', 'Nyencakare', 'Erizooba'], answer: 'Nyomwabazyo' },

    // Unit 3: Actions
    { id: 'r3-1', type: 'mcq', question: 'Translate: "To eat"', options: ['Okulya', 'Okunywa', 'Okukora'], answer: 'Okulya' },
    { id: 'r3-2', type: 'mcq', question: 'Translate: "To drink"', options: ['Okunywa', 'Okulya', 'Okuryama'], answer: 'Okunywa' },
    { id: 'r3-3', type: 'mcq', question: 'Match: "Okukora"', options: ['To work', 'To play', 'To sing'], answer: 'To work' },
    { id: 'r3-4', type: 'mcq', question: 'Translate: "To sleep"', options: ['Okuryama', 'Okuzina', 'Okusoma'], answer: 'Okuryama' },
    { id: 'r3-5', type: 'mcq', question: 'Match: "Okusoma"', options: ['To read/study', 'To cook', 'To run'], answer: 'To read/study' },

    // Unit 4: Questions
    { id: 'r4-1', type: 'mcq', question: 'Translate: "Where?"', options: ['Nkahi?', 'Ryari?', 'Nani?'], answer: 'Nkahi?' },
    { id: 'r4-2', type: 'mcq', question: 'Translate: "When?"', options: ['Ryari?', 'Ahabwaki?', 'Niki?'], answer: 'Ryari?' },
    { id: 'r4-3', type: 'mcq', question: 'Translate: "Who?"', options: ['Nani?', 'Niki?', 'Nkahi?'], answer: 'Nani?' },
    { id: 'r4-4', type: 'mcq', question: 'Translate: "What?"', options: ['Niki?', 'Ahabwaki?', 'Ryari?'], answer: 'Niki?' },
    { id: 'r4-5', type: 'mcq', question: 'Translate: "Why?"', options: ['Ahabwaki?', 'Niki?', 'Nkahi?'], answer: 'Ahabwaki?' },

    // Unit 5: Market Chat
    { id: 'r5-1', type: 'mcq', question: 'Translate: "Money"', options: ['Esaente', 'Eshaho', 'Emotoka'], answer: 'Esaente' },
    { id: 'r5-2', type: 'mcq', question: 'Match: "Okugura"', options: ['To buy', 'To sell', 'To trade'], answer: 'To buy' },
    { id: 'r5-3', type: 'mcq', question: 'Translate: "How much?"', options: ['Zingahi?', 'Nkahi?', 'Niki?'], answer: 'Zingahi?' },
    { id: 'r5-4', type: 'mcq', question: 'Match: "Omushubuzi"', options: ['Trader/Seller', 'Buyer', 'Police'], answer: 'Trader/Seller' },
    { id: 'r5-5', type: 'mcq', question: 'Translate: "I want..."', options: ['Ninyenda...', 'Ninkunda...', 'Nyine...'], answer: 'Ninyenda...' },

    // Unit 6: Advanced
    { id: 'r6-1', type: 'mcq', question: 'Translate: "I am going to the market"', options: ['Nindaza omu katale', 'Nindya amatooke', 'Naaba ndi aha'], answer: 'Nindaza omu katale' },
    { id: 'r6-2', type: 'mcq', question: 'Translate: "I like learning Runyankore"', options: ['Ninkunda kwega Orunyankore', 'Ninsoma ebitabo', 'Nyine esaente'], answer: 'Ninkunda kwega Orunyankore' },
    { id: 'r6-3', type: 'mcq', question: 'Translate: "Where are you going?"', options: ['Nooza nkahi?', 'Oryari?', 'Oguzire niki?'], answer: 'Nooza nkahi?' },
    { id: 'r6-4', type: 'mcq', question: 'Translate: "Thank you for the food"', options: ['Webare ebyokurya', 'Webare omurimo', 'Agandi gye'], answer: 'Webare ebyokurya' },
    { id: 'r6-5', type: 'mcq', question: 'Translate: "It is a good day"', options: ['Nizeiro nungi', 'Eizoba rirungi', 'Kare munonga'], answer: 'Eizoba rirungi' },
  ]
}

function LessonContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // 1. URL Parameters
  const langKey = searchParams.get('lang') || 'Arabic'
  const moduleKey = searchParams.get('module')
  
  // 2. State Management
  const [activeLessonItems, setActiveLessonItems] = useState<LessonItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [textInput, setTextInput] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Feedback & Review States
  const [failedItems, setFailedItems] = useState<LessonItem[]>([])
  const [isReviewing, setIsReviewing] = useState(false)
  const [showReviewPrompt, setShowReviewPrompt] = useState(false)
  const [initialTotalCount, setInitialTotalCount] = useState(0)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])

  // 3. Initialization Logic
  useEffect(() => {
    let bank = LESSON_BANKS[langKey] || LESSON_BANKS['Arabic']
    
    if (moduleKey) {
      const prefixMap: any = { 'Kiswahili': 'k', 'Arabic': 'a', 'Runyankore': 'r' }
      const numMap: any = {
        'greetings': '1', 'time': '2', 'actions': '3',
        'questions': '4', 'conversations': '5', 'advanced': '6'
      }
      const modulePrefix = `${prefixMap[langKey]}${numMap[moduleKey]}`
      if (modulePrefix && !modulePrefix.includes('undefined')) {
        const filtered = bank.filter(item => item.id.startsWith(modulePrefix))
        if (filtered.length > 0) bank = filtered
      }
    }

    // Initialize lesson session
    setActiveLessonItems(bank)
    setInitialTotalCount(bank.length)
    setCurrentIndex(0)
    setSelectedOption(null)
    setFeedback(null)
    setIsFinished(false)
    setFailedItems([])
    setIsReviewing(false)
    setShowReviewPrompt(false)
    setMistakesCount(0)
  }, [langKey, moduleKey])

  // 4. Persistence / Resume Logic
  useEffect(() => {
    const loadProgress = async () => {
      const isResume = searchParams.get('resume') === 'true'
      if (!isResume || activeLessonItems.length === 0) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase.from('profiles').select('last_lesson_index').eq('id', user.id).single()
      if (profile && profile.last_lesson_index > 0 && profile.last_lesson_index < activeLessonItems.length) {
        setCurrentIndex(profile.last_lesson_index)
      }
    }
    loadProgress()
  }, [searchParams, supabase, activeLessonItems.length])

  // 5. Derived State
  const currentItem = activeLessonItems[currentIndex]

  // Shuffle logic
  const shuffleArray = useCallback((array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  useEffect(() => {
    if (currentItem?.options) {
      setShuffledOptions(shuffleArray(currentItem.options))
    }
  }, [currentIndex, currentItem, shuffleArray])

  // 6. Action Handlers
  const playSound = (type: 'correct' | 'wrong' | 'click' | 'finish') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'correct') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      } else if (type === 'wrong') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      } else if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
      } else if (type === 'finish') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        oscillator.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      }

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.error("Unbreakable Sound Error:", e);
    }
  };

  const handleCheck = () => {
    if (feedback) {
      handleNext()
      return
    }

    let representsCorrect = false
    if (currentItem.type === 'mcq' || currentItem.type === 'listening') {
      representsCorrect = selectedOption === currentItem.answer
    } else if (currentItem.type === 'translation') {
      representsCorrect = textInput.trim().toLowerCase() === currentItem.answer.toLowerCase()
    }

    if (representsCorrect) {
      setFeedback('correct')
      playSound('correct')
    } else {
      setFeedback('incorrect')
      playSound('wrong')
      // Record mistake - always add to failedItems for redoing later
      if (!failedItems.find(f => f.id === currentItem.id)) {
        setFailedItems(prev => [...prev, currentItem])
        setMistakesCount(prev => prev + 1)
      }
    }
  }

  const handleNext = async () => {
    setFeedback(null)
    setSelectedOption(null)
    setTextInput('')

    if (currentIndex + 1 >= activeLessonItems.length) {
      // Round end: check if we have any mistakes to redo
      if (failedItems.length > 0) {
        setShowReviewPrompt(true)
      } else {
        await finishLesson()
      }
    } else {
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      saveProgress(nextIdx)
    }
  }

  const saveProgress = async (newIndex: number) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({
      last_lesson_lang: langKey,
      last_lesson_module: moduleKey,
      last_lesson_index: newIndex
    }).eq('id', user.id)
  }

  const finishLesson = async () => {
    setIsSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Fetch fresh profile data to avoid stale state issues
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('xp, completed_modules')
          .eq('id', user.id)
          .single()

        if (fetchError) throw fetchError

        const currentCompleted = profile?.completed_modules || []
        const updatedCompleted = moduleKey && !currentCompleted.includes(moduleKey) 
          ? [...currentCompleted, moduleKey] 
          : currentCompleted

        const { error: updateError } = await supabase.from('profiles').update({
          last_lesson_lang: null,
          last_lesson_module: null,
          last_lesson_index: 0,
          xp: (profile?.xp || 0) + 10,
          completed_modules: updatedCompleted
        }).eq('id', user.id)

        if (updateError) throw updateError
        
        console.log('Progress saved successfully:', updatedCompleted)
      }
    } catch (error) {
      console.error('Failed to save lesson progress:', error)
      alert('Note: We had trouble saving your progress to the cloud. Please check your connection.')
    } finally {
      setIsSaving(false)
      setIsFinished(true)
      playSound('finish')
    }
  }

  const startReview = () => {
    // RECURSIVE MASTERY: Promote mistakes to active items
    setActiveLessonItems([...failedItems])
    setFailedItems([])
    setIsReviewing(true)
    setCurrentIndex(0)
    setShowReviewPrompt(false)
    playSound('click')
    saveProgress(0)
  }

  const playPlaceholderAudio = () => {
    alert(`Audio Simulator: playing native ${langKey} voice saying => '${currentItem?.answer}'`)
  }

  const nextModule = {
    'greetings': 'time', 'time': 'actions', 'actions': 'questions',
    'questions': 'conversations', 'conversations': 'advanced'
  }[moduleKey || ''] || null

  // UI Rendering follows...
  if (!currentItem && !isFinished && !showReviewPrompt) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Coming Soon!</h1>
        <p className="text-lg font-bold text-bold mb-8">This unit is currently under construction for {langKey}.</p>
        <button onClick={() => router.push('/dashboard')} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] text-white hover:bg-[#46A302] px-12 py-4 rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all">
          Back to Dashboard
        </button>
      </div>
    )
  }

  const progressPercent = initialTotalCount > 0 ? (isReviewing ? 100 : (currentIndex / initialTotalCount) * 100) : 0
  const displayPercentage = Math.round(progressPercent)

  if (showReviewPrompt) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-float">
          <img src="/assets/mascot_think.png" alt="Review Mascot" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <h1 className="text-4xl font-extrabold text-foreground mb-6">Let's review!</h1>
        <p className="text-2xl font-bold text-bold mb-12">You missed {failedItems.length} exercise{failedItems.length > 1 ? 's' : ''}. Let's practice them to finish.</p>
        <button onClick={startReview} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-12 py-4 rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all">
          Start Review
        </button>
      </div>
    )
  }

  if (isFinished) {
    const accuracy = initialTotalCount > 0 ? Math.max(0, Math.round(((initialTotalCount - mistakesCount) / initialTotalCount) * 100)) : 100
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 animate-float">
          <img src="/assets/mascot_celebrate.png" alt="Success Mascot" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-hover rounded-xl text-sm font-black text-bold tracking-widest uppercase mb-4 shadow-sm border-2 border-border-color">
          {langKey} • {moduleKey || 'General'} Module
        </div>
        <h1 className="text-4xl font-extrabold text-[#FFC800] mb-8">
          {langKey === 'Arabic' ? 'Mabrouk! (Congratulations!)' : 'Lesson Complete!'}
        </h1>
        <div className="flex gap-4 mb-10 w-full max-w-sm mx-auto">
           <div className="flex-1 bg-surface border-2 border-border-color border-b-4 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="text-[#FFC800] font-black text-xs uppercase tracking-widest mb-1">Total XP</div>
              <div className="text-2xl font-extrabold text-foreground flex items-center gap-2">
                 <Trophy className="h-5 w-5 text-[#FFC800] fill-current" /> +10
              </div>
           </div>
           <div className="flex-1 bg-surface border-2 border-border-color border-b-4 rounded-2xl p-4 flex flex-col items-center justify-center">
              <div className="text-[#58CC02] font-black text-xs uppercase tracking-widest mb-1">Accuracy</div>
              <div className="text-2xl font-extrabold text-foreground">{accuracy}%</div>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {nextModule && (
            <button onClick={() => router.push(`/lesson?lang=${langKey}&module=${nextModule}`)} className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-12 py-4 rounded-2xl border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 transition-all">
              Continue to {nextModule.charAt(0).toUpperCase() + nextModule.slice(1)}
            </button>
          )}
          <button onClick={() => router.push('/dashboard')} className="uppercase tracking-widest text-sm font-bold bg-surface text-bold hover:bg-surface-hover px-12 py-4 rounded-2xl border-2 border-border-color border-b-4 active:border-b-0 active:translate-y-1 transition-all">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col animate-in fade-in duration-500">
      <div className="px-4 py-6 max-w-4xl mx-auto w-full flex items-center gap-4">
        <button onClick={() => router.push('/dashboard')} className="text-bold hover:text-foreground transition-colors">
           <X className="h-6 w-6" />
        </button>
        <button 
          onClick={() => { console.log("Manual Sound Test Initiated"); playSound('click'); }}
          className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-surface-hover text-bold border-2 border-border-color rounded-lg hover:bg-surface hover:text-[#58CC02] transition-all"
        >
          🔊 Test Speakers
        </button>
        <div className="flex-1 bg-border-color h-4 rounded-full overflow-hidden relative">
          <div className="bg-[#58CC02] h-full transition-all duration-500 ease-out rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="flex items-center gap-1 text-[#FF4B4B] font-bold">
          <Heart className="h-6 w-6 fill-current" /> 5
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col justify-center px-6 pb-32 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0 relative">
            <img 
              src={feedback === 'correct' ? '/assets/mascot_celebrate.png' : feedback === 'incorrect' ? '/assets/mascot_think.png' : '/assets/mascot_idle.png'} 
              className={`w-full h-auto object-contain transition-all duration-300 mix-blend-multiply ${feedback === 'correct' ? 'animate-celebrate' : feedback === 'incorrect' ? 'animate-thinking' : 'animate-float'}`}
              alt="Mascot"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-foreground mb-4 leading-tight">{currentItem?.question}</h2>
          </div>
        </div>

        {currentItem?.type === 'listening' && (
          <div className="mb-8 flex justify-center">
            <button onClick={playPlaceholderAudio} className="h-24 w-24 bg-[#58CC02] rounded-3xl border-b-[6px] border-[#357B00] flex items-center justify-center hover:bg-[#46A302] active:border-b-0 active:translate-y-1.5 transition-all">
               <Volume2 className="h-10 w-10 text-white" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shuffledOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                if (!feedback) {
                  playSound('click')
                  setSelectedOption(opt)
                }
              }}
              className={`p-4 rounded-2xl border-2 text-left font-bold text-lg transition-all ${selectedOption === opt ? 'border-[#58CC02] bg-info-bg border-b-[6px] text-[#58CC02]' : feedback ? 'border-border-color opacity-50 text-foreground' : 'border-border-color border-b-[6px] hover:bg-surface-hover text-foreground active:border-b-2 active:translate-y-1'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 border-t-2 z-50 transition-colors duration-300 ${feedback === 'correct' ? 'bg-success-bg border-success-bg' : feedback === 'incorrect' ? 'bg-error-bg border-error-bg' : 'bg-surface border-border-color'}`}>
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-2xl font-extrabold">
            {feedback === 'correct' && <><div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center"><Check className="h-6 w-6 text-[#58CC02]" /></div><span className="text-[#58CC02]">Awesome!</span></>}
            {feedback === 'incorrect' && <><div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center"><XCircle className="h-6 w-6 text-[#EA2B2B]" /></div><div className="text-[#EA2B2B]"><div className="text-xs opacity-80 uppercase tracking-widest mb-1">Correct Answer:</div><div className="text-lg">{currentItem?.answer}</div></div></>}
          </div>
          <button onClick={handleCheck} disabled={!feedback && !selectedOption} className={`uppercase tracking-widest text-sm font-bold px-12 py-4 rounded-2xl transition-all ${feedback === 'correct' ? 'bg-[#58CC02] text-white border-b-4 border-[#46A302]' : feedback === 'incorrect' ? 'bg-[#EA2B2B] text-white border-b-4 border-[#CC2020]' : !selectedOption ? 'bg-border-color text-bold' : 'bg-[#58CC02] text-white border-b-4 border-[#46A302]'}`}>
            {feedback ? 'Continue' : 'Check'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#58CC02]"/></div>}>
      <LessonContent />
    </Suspense>
  )
}
