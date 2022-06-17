import sys
import pandas as pd
from docx.api import Document
import json
import os
from datetime import datetime

def GenerateJSON(fpath, fname):
    document = Document(fpath + fname)
    table = document.tables[0]
    data = []
    keys = None

    jsonfile = "sample" + datetime.today().strftime('%Y%m%d') + ".json"
    if os.path.exists(fpath + jsonfile):
        os.remove(fpath + jsonfile)
    for i, row in enumerate(table.rows):
        text = (cell.text for cell in row.cells)
        if i == 0:
            keys = tuple(text)
            continue
        row_data = dict(zip(keys, text))
        # print(f'row data is {row_data}')
        json_object = json.dumps(row_data, indent=5)
        with open(jsonfile, "a+") as outfile:
            outfile.write(json_object)


if __name__ == '__main__':
    args = sys.argv[:1]
    print("Argv[1] is" + sys.argv)
    # fpath = os.path.dirname(__file__) + "\\"
    # fname = "Infor OS Products Pre-Install Checklist -PRD -16012020.docx"
    # print(f'Filename is {fname}\nFile Location is {fpath}')
    # GenerateJSON(fpath, fname)
