# LinkedIn-TimeStamp-Decryptor

### Introduction
For whatever odd reason, LinkedIn does not display explicit information about the time/date of posts. When viewing recent posts, users can infer a ballpark time guestimate of when a post was uploaded by tags such '1h' or '45m'. However, when viewing older posts, the tags such as '11mo' abstract important details of the timestamp specifications. This is particularly important when utilizing LinkedIn to gauge a timeline of when certain internships/opportunities tend to open up. 

### Strategy
Luckily, if we take an algorithmic approach to the information LinkedIn provides on each post, we can decrypt the timestamp of a post. When you take a look at the public, shareable URL of a post, there are various queries displayed. </br> Take a look at this URL for example: </br>
https://www.linkedin.com/posts/gboateng_explore-program-internship-opportunities-activity-7127814241218138113-KND2?utm_source=share&utm_medium=member_desktop </br>
Notice that amongst the various information, the 19-digit unique identifier associated with the post is also shown. This is common amongst all post URLs, and we can identify the id by checking it is prefixed with 'activity-'

### Algorithm
This 19-digit id is the key to how we can generate the timestamp. First, we need to develop an algorithm to parse the URL and extract only it's unique id. Then, we will convert this id into binary representation. Why? The original id is an encoded timestamp of when the post was uploaded. If we take the first 41 digits of it's binary representation, this will provide the posts actualy timestamp. We can know simply convert this into a representation that can be interpreted easily.
