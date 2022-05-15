export class VideogameFiltersModel {
  title: string;
  console: string;
  completation: number;
  year!: string;
  personalNotes!: string;

  constructor() {
    this.console = 'ALL';
    this.completation = 0;
    this.title = '';
  }
}
