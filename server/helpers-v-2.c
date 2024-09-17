#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>
#include <time.h>

#define ID_LENGTH 19

char* extractId(const char* url) {
    regex_t regex;
    regmatch_t matches[2];
    char* postId = NULL;

    if (regcomp(&regex, "activity-(\\d{19})", REG_EXTENDED) != 0) {
        fprintf(stderr, "Could not compile regex\n");
        return NULL;
    }

    if (regexec(&regex, url, 2, matches, 0) == 0) {
        int start = matches[1].rm_so;
        int end = matches[1].rm_eo;
        int length = end - start;

        postId = (char*)malloc(length + 1);
        if (postId == NULL) {
            fprintf(stderr, "Memory allocation failed\n");
            regfree(&regex);
            return NULL;
        }

        strncpy(postId, url + start, length);
        postId[length] = '\0';

        if (strlen(postId) != ID_LENGTH || strspn(postId, "0123456789") != ID_LENGTH) {
            free(postId);
            postId = NULL;
        }
    }

    regfree(&regex);
    return postId;
}

long long toUnixTimeStamp(const char* id) {
    unsigned long long bigIntId = strtoull(id, NULL, 10);
    unsigned long long relevant_bits = bigIntId >> 22;  // Shift right by 22 bits to get the first 41 bits
    return (long long)relevant_bits + 1288834974657LL;  // Add Twitter epoch
}

char* getTimeStamp(long long timestamp) {
    time_t unix_time = (time_t)(timestamp / 1000);  // Convert milliseconds to seconds
    struct tm* timeinfo = gmtime(&unix_time);
    
    char* buffer = (char*)malloc(100);  // Allocate memory for the formatted string
    if (buffer == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return NULL;
    }
    
    strftime(buffer, 100, "%a, %d %b %Y %H:%M:%S GMT", timeinfo);
    return buffer;
}

int main() {
    const char* url = "https://example.com/activity-1234567890123456789";
    
    char* id = extractId(url);
    if (id != NULL) {
        printf("Extracted ID: %s\n", id);
        
        long long timestamp = toUnixTimeStamp(id);
        printf("Unix Timestamp: %lld\n", timestamp);
        
        char* readableTime = getTimeStamp(timestamp);
        if (readableTime != NULL) {
            printf("Readable Time: %s\n", readableTime);
            free(readableTime);
        }
        
        free(id);
    } else {
        printf("No valid ID found\n");
    }
    
    return 0;
}