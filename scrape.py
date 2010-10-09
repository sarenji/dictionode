from elementtree import ElementTree
from mwlib.uparser import parseString
from mwlib.htmlwriter import HTMLWriter
from mwlib.dummydb import DummyDB

#file_name = "wiktionary-201005.xml"
file_name = "test.xml"
file = open(file_name)
tree = ElementTree.parse(file)
elem = tree.getroot()

pages = elem.findall("page/revision/text")
print pages
