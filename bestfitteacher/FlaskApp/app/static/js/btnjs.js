

var contentbody= $('#myIframe').contents().find('html').html();


$(document).ready(function() {

	$('#form1').on('submit', function(event) {

		$.ajax({
			data : JSON.stringify({
				'name' : $('#myIframe').contents().find('html').html(),
				'email' : $('#emailInput').val()
			}),
			type : 'POST',
			url : '{{url_for('auth.process')}}',
			contentType: 'application/json;charset=UTF-8'
		});
		event.preventDefault();

	});

});


function qadatafunc(qanumber,question, answer) {
  this.qanumber=qanumber;
  this.question = question;
  this.answer = answer;
 // this.comments = comments;
  // here you can add some logic for the distance field, if you like:
 // this.distance = distance;
}
var previoustag=0;
var qadata=[]
var qdata1=[]
var currentquestion=''
var currentanswer=''
var qcount=0
var qanumber=0
//function hidehighlights()
//{

//passdata(qadata)

$(document).ready(function() {

	$('#form3').on('submit', function(event) {
        var labelcount=$('#myIframe').contents().find("label").length
//alert(labelcount)
var counter=0
$('#myIframe').contents().find("label").each(function (i) {


        labeltitle=$(this).attr('title')

        if(labeltitle.includes("question"))
        {
        //alert($(this).text())
             if(previoustag==1)
            {   qdata1[qcount]=[qcount+1,currentquestion,currentanswer]
                qcount=qcount+1
                qanumber=qanumber+1
                qadata.push(new qadatafunc(qanumber,currentquestion, currentanswer));
               // alert("Question :" + currentquestion+ "  " + "Answer:" + "   " + currentanswer)
                currentquestion=$(this).text()
                currentanswer=''
                previoustag=0

            }
            else if(previoustag==0)
            {
                currentquestion= currentquestion+$(this).text()
              //  alert("I am here")
            }

       // previoustag=0
       // alert($(this).text())
        }
        if(labeltitle.includes("answer"))
        {
       // alert($(this).text())
       // if(previoustag==0)
            currentanswer= currentanswer+$(this).text()
            previoustag=1
       // alert($(this).text())
        }


//alert("Counter  " + i + ":" + $(this).text())

});

//alert("Question :" + currentquestion+ "  " + "Answer:" + "   " + currentanswer)
qdata1[qcount]=[qcount+1,currentquestion,currentanswer]
qanumber=qanumber+1
qadata.push(new qadatafunc(qanumber,currentquestion, currentanswer));
		$.ajax({
			data : JSON.stringify(qadata),
			type : 'POST',
			url : '{{url_for('auth.makeflashcard')}}',
			contentType: 'application/json;charset=UTF-8',
			success: function() {
			window.location.href = '{{url_for('auth.makeppt')}}'

			}
		});
		event.preventDefault();

	});

});


