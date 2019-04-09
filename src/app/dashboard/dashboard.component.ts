import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { RouterExtensions } from "nativescript-angular";
import { ActivatedRoute } from "@angular/router";
import { isAndroid } from "tns-core-modules/platform";
import {ApiService} from "~/app/api.service";
import {HttpParams} from "@angular/common/http";
@Component({
    selector: "ns-dashboard",
    templateUrl: "./dashboard.component.html",

    moduleId: module.id
})
export class DashboardComponent implements OnInit {

    logowin: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA1IAAADKCAYAAACv+3G0AAAAG" +
        "XRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw" +
        "/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1s" +
        "bnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAx" +
        "NS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzA" +
        "yLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9uc" +
        "y5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3" +
        "VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6" +
        "NkM2OTVDNjMzQ0NEMTFFOUJGMDdFMjUwQTMwNEMzRjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkM2OTVDNjIzQ0NEMTFFOUJ" +
        "GMDdFMjUwQTMwNEMzRjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgTWFjaW50b3NoIj4gPHhtcE1NOkR" +
        "lcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkQ4Q0UxNTgzQzdCMTFFOUJGMDdFMjUwQTMwNEMzRjEiIHN0UmVmOmR" +
        "vY3VtZW50SUQ9InhtcC5kaWQ6NkQ4Q0UxNTkzQzdCMTFFOUJGMDdFMjUwQTMwNEMzRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRm" +
        "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";



    listaiscritti: any[] = [];


    constructor( private apiService: ApiService) {
    }




    ngOnInit() {

         this.apiService.prendiiscritti().subscribe( result => {
             this.listaiscritti=result;
             console.log(result);
         })

    }

}
