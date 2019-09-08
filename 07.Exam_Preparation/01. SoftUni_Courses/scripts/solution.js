document.querySelector('#availableCourses > div.courseFoot > button').addEventListener('click', solve);

function solve() {

    const elements = {
        jsFund: document.querySelector(
            '#availableCourses > div.courseBody > ul > li:nth-child(1) > input[type=checkbox]').checked,
        jsAdv: document.querySelector(
            '#availableCourses > div.courseBody > ul > li:nth-child(2) > input[type=checkbox]').checked,
        jsApp: document.querySelector(
            '#availableCourses > div.courseBody > ul > li:nth-child(3) > input[type=checkbox]').checked,
        jsWeb: document.querySelector(
            '#availableCourses > div.courseBody > ul > li:nth-child(4) > input[type=checkbox]').checked,
        onsite: document.querySelector('#educationForm > input[type=radio]:nth-child(2)').checked,
        online: document.querySelector('#educationForm > input[type=radio]:nth-child(4)').checked,
        myCourses: document.querySelector('#myCourses > div.courseBody > ul'),
        totalPrice: document.querySelector('#myCourses > div.courseFoot > p'),
    };

    debugger;

    const jsAdvPrice = 180;
    const jsAdvFinalPrice = (elements.jsFund && elements.jsAdv ? 0.9 * jsAdvPrice : jsAdvPrice);

    const courses = {
        'JS Fundamentals': elements.jsFund ? 170 : 0,
        'JS Advanced': elements.jsAdv ? jsAdvFinalPrice : 0,
        'JS Applications': elements.jsApp ? 190 : 0,
        'JS Web': elements.jsWeb ? 490 : 0,
    };

    const coursesNames = {
        'JS Fundamentals': elements.jsFund,
        'JS Advanced': elements.jsAdv,
        'JS Applications': elements.jsApp,
        'JS Web': elements.jsWeb,
    };


    (function calculateMyCourses() {

        elements.myCourses.innerHTML = '';

        let totalPrice = 0;

        for (let course in courses) {
            if (elements.online) {
                totalPrice += courses[course] * 0.94;
            } else {
                totalPrice += courses[course];
            }
        }

        let myCourses = [];

        for (const [key, value] of Object.entries(coursesNames)) {
            if (value) {
                myCourses.push(createHtmlElement('li', key))
            }
        }

        if (elements.jsFund && elements.jsAdv && elements.jsApp) {
            totalPrice *= 0.94;
            if (elements.jsWeb) {
                myCourses.push(createHtmlElement('li', 'HTML and CSS'));
            }
        }

        appendChildren(myCourses, elements.myCourses);

        elements.totalPrice.textContent = totalPrice.toFixed(2);
    }());

    function createHtmlElement(tagName, textContent, className) {
        let currElement = document.createElement(tagName);

        if (textContent) {
            currElement.textContent = textContent;
        }

        if (className) {
            if (typeof className === 'string') {
                currElement.classList.add(className);
            } else if (typeof className === 'object') {
                currElement.classList.add(...className);
            }
        }

        return currElement;
    }

    function appendChildren(children, parent) {
        children.forEach((child) => parent.appendChild(child));

        return parent;
    }
}