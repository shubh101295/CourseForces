export const questions = [
	{
		question_type: 'MCQ',
		content:{
			heading: "What is full form of WTF?"
			options: {
				option1: "Wednesday Thursday Friday",
				option2: "What the Folks",
				option3: "Work Time Fun",
				option4: "All of the above :p"
			}
		},
		answer: "All of the above :p",
		marked_ans: '',
		positive_marks: 3,
		negative_marks: -1,
		partial_allowed: false
		
	},
	{
		question_type: 'MCQ',
		content:{
			heading: "What is full form of LOL?"
			options: {
				option1: "Laughing Out Loud",
				option2: "Laughing out Laughing",
				option3: "Loud Out Loud",
				option4: "Loud Out Laughing"
			}
		},
		answer: "Laughing Out Loud",
		marked_ans: '',
		positive_marks: 3,
		negative_marks: -1,
		partial_allowed: false
	},
	{
		question_type: 'MSQ',
		content:{
			heading: "What is full form of WTF?"
			options: {
				option1: "Wednesday Thursday Friday",
				option2: "What the Folks",
				option3: "Work Time Fun",
				option4: "None of the above"
			}
		},
		answer: [ "Wednesday Thursday Friday", "What the Folks","Work Time Fun"],
		positive_marks: 4,
		negative_marks: -1,
		partial_allowed: true
		
	},
	{
		question_type: 'T/F',
		content:{
			heading: "The full form of SQL is Subsequent Query Language?"
			options: {
				option1: "True",
				option2: "False",
			}
		},
		answer: "False",
		positive_marks: 3,
		negative_marks: 0,
		partial_allowed: false
		
	},
	{
		question_type: 'MCQ',
		content:{
			heading: "What is full form of WTF?"
			options: {
				option1: "Wednesday Thursday Friday",
				option2: "What the Folks",
				option3: "Work Time Fun",
				option4: "All of the above :p"
			}
		},
		answer: "All of the above :p",
		positive_marks: 3,
		negative_marks: -1,
		partial_allowed: false
		
	},
]