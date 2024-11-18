[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/qynt0qaN)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16946326&assignment_repo_type=AssignmentRepo)
#  Olympic report application

## 👥 Team Name
-   Deadline

## 👥 Team Member

| Name          | StudentId  |
|---------------|------------|
| LiaoZhenghua  | 20222092   |
| HeHaonan      | 20222094   |
| ChenHao       | 20222090   |


## 🚀vercel online access
-   https://vue-frontend-app-project-sybp.vercel.app/

## 📋 Project Structure

-   1.HomeView  
        -1.1 RankList


-   2.CountryDetailview
        -2.1 CountryDetail  
        -2.2 CountryMedal-Info  
        -2.3 CountrySportList


-   3.SportInfo view  
        -3.1 SportDetail    
        -3.2 CommentList


-   4.Navigation Bar  
        -4.1 Search Box  
        -4.2 Home|About|Contact View


-   5.DB  
        -5.1countryinfo.json  
        -5.2sportdb.json


-   6.NotFoundView


---    
## 🚀 Component introduction

-   1：The navigation bar is applied to the whole project to realize the jump between each page and the home page.  
        The search box is applied in navigation to jump to the country details corresponding to the full name of the country you inputed.  
        When you typing in the search box, suggestions will be made below based on your input.

        
-   2：Ranklist instead of event lists used to enable you to view the country details, when you click on the country will be redirected to the country details page.  
        Ranklist offer pagesize, where you can enter the country you want to display on each page (min:1 to max:10 and NumberOnly!)  
        And click update, you will see the ranklist updated.   
        The ranklist also includes a page-turning function to see the list of countries on the previous and next page .


-   3: SportList is provided on the country details page, each country has a separate list of sports, the sports list is provided   
        with 1.SportName 2. The number of MEDALS in various sports in that country.  
        When the user clicks on the name of the sport, it will be redirected to the sport details page.


-   4: CommentList is displayed in SportInfo view to Cheer to the athletes.  
        Users can type in the input box and click Submit, and you can see the user's comments below.
---
