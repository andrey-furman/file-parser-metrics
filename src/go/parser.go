package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"time"
)

func main() {
	start := time.Now()
	sourceDir := "/Users/AndreyFurman/Downloads/parser-metrics/data/"
	sourceFilePath := fmt.Sprintf("%sdata-source.csv", sourceDir)
	targetFilePath := fmt.Sprintf("%sdata-target.csv", sourceDir)
	sourceFile, errSourceFile := os.Open(sourceFilePath)

	if errSourceFile != nil {
		log.Fatal(fmt.Sprintf("Error on open source file: %s", errSourceFile))
	}
	defer func(sourceFile *os.File) {
		err := sourceFile.Close()
		if err != nil {
			log.Fatal(fmt.Sprintf("Error on close source file: %s", err))
		}
	}(sourceFile)
	targetFile, errTargetFile := os.OpenFile(targetFilePath, os.O_TRUNC|os.O_APPEND|os.O_WRONLY, os.ModeAppend)
	if errTargetFile != nil {
		log.Fatal(fmt.Sprintf("Error on open target file: %s", errTargetFile))
	}
	scanner := bufio.NewScanner(sourceFile)
	for scanner.Scan() {
		_, err := targetFile.WriteString(fmt.Sprintf("%s\n", scanner.Text()))
		if err != nil {
			log.Fatal(fmt.Sprintf("Error on write file string %s", err))
		}
	}
	fmt.Println(time.Since(start))
}
