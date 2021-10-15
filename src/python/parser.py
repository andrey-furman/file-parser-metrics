import time
import os

start_time = time.time()


def main(index):
    print(f'attempt {index}')
    source_file_path = f'{os.getcwd()}/data/data-source.csv'
    target_file_path = f'{os.getcwd()}/data/data-target.csv'
    source_file = open(source_file_path, "r")
    target_file = open(target_file_path, "w")
    target_file.truncate(0)

    for line in source_file.readlines():
        target_file.write(line)

    # Release used resources
    source_file.close()
    target_file.close()
    print(time.time() - start_time)


if __name__ == '__main__':
    main(10)
