import { readFile } from "fs";
enum FileParserState {
    readingName,
    readingValue,
    readingComment,
    readingwhitespaceAfterName,
    readingArray
}
interface ParseMap {
    [key: string]: string | ParseMap | ParseList
}
type ParseList = Array<string | ParseMap |ParseList>;

/**
 * 
*/
class FileParser {
    parseData:ParseMap = {};
    pathToCurrentObject:Array< string | number> = [];
    state: FileParserState = FileParserState.readingName;
    currentParent: ParseMap | ParseList = this.parseData;
    unwrittenString:string = "";
    handleChunk(data: Buffer):void {
        for (const char of data.toString()) {
            this.handleChar(char);
        }
    }
    handleChar(char:string) {
        if (/\n/.test(char)) {
            this.state = FileParserState.readingName;
            return;
        } else if (this.state == FileParserState.readingComment) {
            return;
        } else if (/\s/.test(char)) {
            if (this.state == FileParserState.readingName) {
                this.state = FileParserState.readingwhitespaceAfterName;
            }
            return;
        }
        if (/\s/.test(char)) {return;}
        switch (char) {
            case "#": this.state = FileParserState.readingComment; break;
            case "{": this.handleOpenBrackets(); break;
            case "}": this.handleCloseBrackets(); break;
            case "=": this.handleEquals(); break;
            default:  this.handleOtherText(char); break;
        }
    }
    handleOpenBrackets() {
        if (this.state == FileParserState.readingName) {
            throw new Error("invalid data: "+this.pathToCurrentObject.toString());
        }
        else if (this.state == FileParserState.readingValue) {
            let pointer:string|ParseMap|ParseList = this.parseData;
            for (const index of this.pathToCurrentObject) {
                
            }
            this.state = FileParserState.readingName;
        }
    }
    handleCloseBrackets() {
        if (this.state == FileParserState.readingName) {
        }
        else if (this.state == FileParserState.readingValue) {}
    }
    handleEquals() {
        this.pathToCurrentObject.push(this.unwrittenString);
    }
    handleOtherText(char:string) {
        if (this.state == FileParserState.readingwhitespaceAfterName) {
            this.state = FileParserState.readingArray;
        }
        this.unwrittenString += char;
    }

    returnOutput():Object {
        return this.parseData;
    }
    
}

export default function parseConfigFile(pathname:Array<string>):Object {
    const path = "C:\\Users\\skybe\\Projects\\stellaris-navy-optimize\\stellaris_common\\pop_jobs\\01_ruler_jobs.txt";
    const parser = new FileParser();
    readFile(path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
        parser.handleChunk(data);
    });
    return parser.returnOutput();
}