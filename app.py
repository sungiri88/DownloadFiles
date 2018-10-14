from flask import Flask,render_template,request,jsonify,send_file
import requests,json,glob
from datetime import datetime
app = Flask(__name__)

# Variables
filesDir="/var/www/flask/DownloadFiles/files/"

# Common Functions
def getRequest(url,username,password):
    return requests.get(url,auth=(username,password), verify=False)

def postRequest(url,payload,username,password):
    return requests.post(url,data=payload, auth=(username,password), verify=False)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/api/files",methods = ['POST'])
def files():
    content = request.get_json()
    objDate = datetime.strptime(content['date'], '%m/%d/%Y')
    year=datetime.strftime(objDate,'%Y')
    day=datetime.strftime(objDate,'%d')
    month=datetime.strftime(objDate,'%m')
    if content['domain']:
        regex=content['domain']+"_"+year+"_"+month+"_"+day
    else:
        regex=year+"_"+month+"_"+day    
    print regex    
    mylist = [f for f in glob.glob1(filesDir,"*"+regex+".zip")]
    return json.dumps(mylist)

@app.route("/api/listFiles")
def ListFiles():
    try:
	mylist = [f for f in glob.glob1(filesDir,"*.zip")]
	return json.dumps(mylist)
    except Exception as e:
	print e	
		
@app.route("/api/downloadlogfile/<path>")
def DownloadLogFile (path = None):
    try:
	print path
        return send_file(filesDir+path, as_attachment=True)
    except Exception as e:
	print e
if __name__ == "__main__":
    app.run(debug=True,host="192.168.33.10",port="4000")
