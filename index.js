const pa11y = require('pa11y');
const htmlReporter = require('pa11y-reporter-html');
const fs = require('fs');

(async ()=> {
    {
        defaults: { 
            'timeout 35000'
        }
    }
   await runpa11y("https://www.google.com");
      })().catch(e => {
    console.error(e);
    process.exit(1);
})

async function runpa11y(url){
    
    const report = await pa11y(url, {
        actions: [
            'set field input[name="q"] to srivasavi',
            'wait for element input[value="Google Search"] to be visible',
            'click element input[value="Google Search"]',
            'wait for element body>div#main to be visible',
            'screen capture example.png'
        ]

    }).then((results) => {
        return results;
});

const html =  await htmlReporter.results(report);
fs.writeFile('Google-a11y-report.html', html, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
    