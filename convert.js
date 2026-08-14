const data = [  
	// paste the JSON from the converter here  
];

const transformed = {  
	title: "Geography",  
	questions: data.map(q => ({  
		question: q.question,  
		options: [ 
			q.option1,  
			q.option2,  
			q.option3,  
			q.option4  
		],  
		answer: q.answer  
	}))  
};  

console.log(JSON.stringify(transformed, null, 2));