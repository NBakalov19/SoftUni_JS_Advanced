function bmi(name, age, weight, height) {

    let bmiIndex = Math.round(weight / Math.pow(height / 100, 2));

    let obj = {
        name,
        personalInfo: {
            age,
            weight,
            height
        },
        BMI: bmiIndex,
        status: ''
    };

    if (obj.BMI < 18.5) {
        obj.status = 'underweight';
    } else if (obj.BMI < 25) {
        obj.status = 'normal';
    } else if (obj.BMI < 30) {
        obj.status = 'overweight';
    } else {
        obj.status = 'obese';
        obj.recommendation = 'admission required';
    }

    return obj;
}

console.log(bmi('Peter', 25, 75, 182));