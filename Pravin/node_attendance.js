const node = import('node-fetch').default;
const cheerio = require('cheerio');

const fetchWebpage = async () => {
    const fetch = (await import('node-fetch')).default;;
    const response  = await fetch('https://webkiosk.juet.ac.in/index.jsp', {
        method: 'GET',
    });
    // Extract JSESSIONID from cookies
    const jsessionid = response.headers.get('set-cookie').split(';')[0].split('=')[1];
        
    // Convert response to text
    const body = await response.text();
    
    // Load the HTML into cheerio
    const $ = cheerio.load(body);
    
    // Extract captcha text
    const captcha = $('.noselect').text().trim();
    
    console.log('JSESSIONID:', jsessionid);
    console.log('Captcha:', captcha);

    const payload = new URLSearchParams({
        x: '',
        txtInst: 'Institute',
        InstCode: 'JUET',
        txtuType: 'Member Type',
        UserType: 'S',
        txtCode: 'Enrollment No',
        MemberCode: '',
        DOB: 'DOB',
        DATE1: '',
        txtPin: 'Password/Pin',
        Password: '',
        txtCodecaptcha: 'Enter Captcha',
        txtcap: `${captcha}`,
        BTNSubmit: 'Submit'
    });
    const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': '240',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `switchmenu=; JSESSIONID=${jsessionid}`,
        'Host': 'webkiosk.juet.ac.in',
        'Origin': 'https://webkiosk.juet.ac.in',
        'Pragma': 'no-cache',
        'Referer': 'https://webkiosk.juet.ac.in/index.jsp',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Brave";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Sec-Gpc': '1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    fetch('https://webkiosk.juet.ac.in/CommonFiles/UserAction.jsp', {
    method: 'POST',
    headers: headers,
    body: payload
})
.then(response => response.text())
.then(data => {
    return fetch('https://webkiosk.juet.ac.in/StudentFiles/Academic/StudentAttendanceList.jsp', {
        method: 'GET',
        headers: headers,
        // credentials: 'include' // This is important to include cookies
    });
})
.then(response => response.text())
.then(data => {
    let $ = cheerio.load(data);
    let subjects = [];
        $('table tbody tr').each((i, elem) => {
            if(i<=2) return;
            let subjectName = $(elem).find('td:nth-child(2)').text().trim();
            let lecturePlusTutorialAttendance = $(elem).find('td:nth-child(3) a').text().trim();
            let lectureAttendance = $(elem).find('td:nth-child(4) a').text().trim();
            let tutorialAttendance = $(elem).find('td:nth-child(5) a').text().trim();
            let practicalAttendance = $(elem).find('td:nth-child(6) a').text().trim();
            
            subjects.push({
                subjectName,
                lecturePlusTutorialAttendance,
                lectureAttendance,
                tutorialAttendance,
                practicalAttendance
            });
        });

        console.log(subjects);

        subjects.forEach(subject => {
            console.log(`Subject: ${subject.subjectName}, Lecture+Tutorial Attendance: ${subject.lecturePlusTutorialAttendance}, Lecture Attendance: ${subject.lectureAttendance}, Tutorial Attendance: ${subject.tutorialAttendance}, Practical Attendance: ${subject.practicalAttendance}`);
        });
})
.catch(error => console.error('Error:', error));


};

fetchWebpage();
