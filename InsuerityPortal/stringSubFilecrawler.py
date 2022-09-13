import os
list  = []
count = 0
for root, dirs, files in os.walk("."):
    for d in dirs:
        list.append(os.path.join(root, d))

print("Enter filename : ")
fileName = str(input())

count2 = 0
subfilepathlist = []
foundfilepathlist = []
for each_path in list:
    d = each_path
    for path in os.listdir(d):
        fullFileNameOnly = path.split(".")
        fileNameOnly = fullFileNameOnly[0]
        if(fileName != ""):
            if(path == fileName or fileName == fileNameOnly):
                print(os.path.join(d, path))
        full_path = os.path.join(d, path)
        if os.path.isfile(full_path):
            subfilepathlist.append(full_path)
            # count += 1

print("Enter string : ")
string_word = str(input())
if(string_word != ""):
    for each_filepath in subfilepathlist:
        with open(each_filepath) as f:
            try:
                if string_word in f.read():
                    foundfilepathlist.append(each_filepath)
            except:
                pass
    for foundPath in foundfilepathlist:
        print(foundPath)
