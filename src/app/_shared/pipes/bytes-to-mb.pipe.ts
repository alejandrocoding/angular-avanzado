import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'bytesToMB' })
export class BytesToMBPipe implements PipeTransform {
    transform(size: number, extension = 'MB'): string {
        return (size / (1024 * 1024)).toFixed(2) + extension;
    }
}
