Project Surat
=============
A location based file sharing system. Built at InOut Hackathon
--------------------------------------------------------------

Ever thought of quickly sharing files with a lot people around you? You don't have the create any links or share anything. All you need to do is open the application,post your files and viola, everyone has it. project-surat is a location based file sharing system that falls in the domain of the Internet Of Things.This project is a mobile first web application with an objective to make file sharing simple and easy.It is divided into two components. The first is a map that shows the user's location along with the neighbouring region. The blue dot on the map marks the user's location and the pink dots mark the files present around that user's location.The second component is a list of files that describes each file and it's attributes. The attributes include:

  * Data - This section contains either plain text or the name of the file(text,image,audio).
  * Data type - This appears as a green tag which may contain two values - txt,file.
  * Distance - This appears as a yellow tag that indicates the distance of a file from the user's location.
  * Owner - The owner of that file.

### Quickstart
    $ npm install
    $ npm start

### Deploy
    $ npm run build

### Features
    * Location based file and sharing
    * Supports multiple input types.(Text files, text input, audio).
    * Easy access to files with one click downloads
    * Easy to use drag and drop functionality

### How it works?
When a user opens the website, the geo-location of the user is recorded.The user can either view files within a particular range or opt to add a new file. The file could be a text file, image file or plain text. This files are mapped to corresponding geo locations and will continue to remain there until removed. Any user within that range can view and add files.

### License
ISC License (ISC)
Copyright (c) 2016, Ankit Muchhala muchhalaankit@gmail.com, Kushan Joshi 0o3ko0@gmail.com, Sahil Jain sahiljain112@gmail.com

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

### Link
https://project-surat.firebaseapp.com/
