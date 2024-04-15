const node = import('node-fetch').default;
const cheerio = require('cheerio');

const fetchWebpage = async () => {
    const fetch = (await import('node-fetch')).default;;
    const response  = await fetch('https://webkiosk.juet.ac.in/index.jsp', {
        method: 'GET',
    });
    
    const jsessionid = response.headers.get('set-cookie').split(';')[0].split('=')[1];
 
    const body = await response.text();

    const $ = cheerio.load(body);
    
   
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
        MemberCode: '211B221',
        DOB: 'DOB',
        DATE1: '15-03-2003',
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
    return fetch('https://webkiosk.juet.ac.in/StudentFiles/Exam/StudentEventMarksView.jsp?x=&exam=2024EVESEM', {
        method: 'GET',
        headers: headers,
    });
})
.then(response => response.text())
.then(data => {
    let $ = cheerio.load(data);

    const lastTable = $('table').last();

    const examMarks = [];

    lastTable.find('tr').each((i, row) => {
        // Skip the header row
        if (i ===   0) return;

        
        const srNo = $(row).find('td').eq(0).text().trim();
        const subjectCode = $(row).find('td').eq(1).text().trim();
        const t1 = $(row).find('td').eq(2).text().trim() || '';
        const t2 = $(row).find('td').eq(3).text().trim() || '';
        const t3 = $(row).find('td').eq(4).text().trim() || '';
        const p1 = $(row).find('td').eq(5).text().trim() || '';
        const p2 = $(row).find('td').eq(6).text().trim() || '';
        examMarks.push({
            srNo,
            subjectCode,
            t1,
            t2,
            t3,
            p1,
            p2
        });
    });

    console.log(examMarks);
})
.catch(error => console.error('Error:', error));


};

fetchWebpage();
